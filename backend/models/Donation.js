const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaignId: { type: String, required: true },
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  paymentId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  paymentMethod: { type: String }, // e.g., 'UPI_INTENT', 'QR'
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
