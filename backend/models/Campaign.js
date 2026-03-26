const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  patientName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  donorCount: { type: Number, default: 0 },
  coverImage: { type: String },
  gallery: [{ type: String }],
  description: { type: String }, // Story fetched from WordPress or stored locally
  wordpressId: { type: String }, // WP Post ID to link
  expiryDate: { type: Date },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'EXPIRED'], default: 'ACTIVE' },
  isUrgent: { type: Boolean, default: false },
});

module.exports = mongoose.model('Campaign', campaignSchema);
