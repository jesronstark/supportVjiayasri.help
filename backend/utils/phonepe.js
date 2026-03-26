const axios = require('axios');
const crypto = require('crypto');

/**
 * PhonePe API Utility for UPI Integration
 * Merchant config: Replace placeholders with actual credentials
 */
const PHONEPE_CONFIG = {
  MERCHANT_ID: process.env.PHONEPE_MERCHANT_ID || 'PGMDEMO',
  SALT_KEY: process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399',
  SALT_INDEX: 1,
  CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:5000/api/donation/webhook',
  API_URL: process.env.PHONEPE_API_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
};

const initiatePayment = async ({ transactionId, amount, mobileNumber, donorId }) => {
  const payload = {
    merchantId: PHONEPE_CONFIG.MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: donorId,
    amount: amount * 100, // Amount in paise
    redirectUrl: `http://localhost:3000/donation-success?txn=${transactionId}`,
    redirectMode: 'REDIRECT',
    callbackUrl: PHONEPE_CONFIG.CALLBACK_URL,
    mobileNumber,
    paymentInstrument: {
      type: 'PAY_PAGE', // For UPI intent/Page redirect
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const stringToSign = base64Payload + '/pg/v1/pay' + PHONEPE_CONFIG.SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
  const checksum = sha256 + '###' + PHONEPE_CONFIG.SALT_INDEX;

  try {
    const response = await axios.post(
      PHONEPE_CONFIG.API_URL,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('PhonePe Payment Initiation Error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { initiatePayment };
