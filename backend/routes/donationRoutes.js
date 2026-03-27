const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

// GET recent successful donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donation.find({ paymentStatus: 'SUCCESS' }).sort({ timestamp: -1 }).limit(20);
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /donate - Simple donation record (payment is handled via WhatsApp/QR)
router.post('/', async (req, res) => {
  const { amount, donorName, message, campaignId } = req.body;
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
    res.json({ success: true, transactionId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
