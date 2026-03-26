const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const { initiatePayment } = require('../utils/phonepe');
const crypto = require('crypto');

// GET recent successful donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donation.find({ paymentStatus: 'SUCCESS' }).sort({ timestamp: -1 }).limit(20);
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /donate - Initiate donation and payment
router.post('/', async (req, res) => {
  const { amount, donorName, message, mobileNumber, campaignId } = req.body;
  const transactionId = 'TXN' + Date.now();

  try {
    const donation = new Donation({
      campaignId,
      donorName,
      amount,
      message,
      paymentId: transactionId,
      paymentStatus: 'PENDING'
    });
    await donation.save();

    // Initiate PhonePe API call
    const paymentResponse = await initiatePayment({
      transactionId,
      amount,
      mobileNumber,
      donorId: donation._id.toString()
    });

    if (paymentResponse?.success) {
      res.json({
        success: true,
        paymentUrl: paymentResponse.data.instrumentResponse.redirectInfo.url,
        transactionId
      });
    } else {
      res.status(400).json({ success: false, message: 'Payment initiation failed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Webhook for PhonePe payment validation
router.post('/webhook', async (req, res) => {
  const { response } = req.body; // PhonePe returns base64 response
  const base64Response = Buffer.from(response, 'base64').toString('ascii');
  const details = JSON.parse(base64Response);

  const { merchantTransactionId, code } = details;

  if (code === 'PAYMENT_SUCCESS') {
    const donation = await Donation.findOne({ paymentId: merchantTransactionId });
    if (donation && donation.paymentStatus !== 'SUCCESS') {
      donation.paymentStatus = 'SUCCESS';
      await donation.save();

      // Update campaign progress
      const campaign = await Campaign.findById(donation.campaignId);
      if (campaign) {
        campaign.raisedAmount += donation.amount;
        campaign.donorCount += 1;
        await campaign.save();
        
        // Broadcast new donation via Socket.io
        req.app.get('io').emit('newDonation', donation);
      }
    }
  }

  res.send({ success: true });
});

module.exports = router;
