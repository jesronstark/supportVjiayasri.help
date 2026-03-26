const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// 1. Set Security HTTP headers
app.use(helmet());

// 2. Limit requests from same IP (DDoS protection)
const limiter = rateLimit({
  max: 100, // 100 requests
  windowMs: 15 * 60 * 1000, // per 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// 3. Prevent large payload attacks
app.use(express.json({ limit: '10kb' }));

// 4. Implement CORS
app.use(cors());

// 5. Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 6. Data sanitization against XSS
app.use(xss());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crowdfunding')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Make Socket.io available to routes
app.set('io', io);

// Models
const Campaign = require('./models/Campaign');
const Donation = require('./models/Donation');

// Routes
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

app.use('/api/donations', donationRoutes);
app.use('/api/campaign', campaignRoutes);

// Seed initial campaign if none exists
const seedCampaign = async () => {
  const count = await Campaign.countDocuments();
  if (count === 0) {
    const campaign = new Campaign({
      title: 'Support Vijaya Sri\'s Critical Medical Treatment',
      patientName: 'Vijaya Sri',
      targetAmount: 1500000,
      raisedAmount: 450000,
      donorCount: 152,
      coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Vijaya Sri is fighting a severe medical condition and needs urgent support for surgery...',
      isUrgent: true,
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    });
    await campaign.save();
    console.log('Seeded initial campaign: Vijaya Sri');
    
    // Seed fake donors
    const fakeDonors = [
      { donorName: 'Rahul S.', amount: 500, message: 'Get well soon!', campaignId: campaign._id, paymentId: 'TXN001', paymentStatus: 'SUCCESS' },
      { donorName: 'Amita M.', amount: 2000, message: 'Praying for you.', campaignId: campaign._id, paymentId: 'TXN002', paymentStatus: 'SUCCESS' },
      { donorName: 'Anonymous', amount: 1000, message: 'Stay strong!', campaignId: campaign._id, paymentId: 'TXN003', paymentStatus: 'SUCCESS' }
    ];
    await Donation.insertMany(fakeDonors);
  }
};

seedCampaign();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
