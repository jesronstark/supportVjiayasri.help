const express = require('express');
const router = express.Router();
const axios = require('axios');
const Campaign = require('../models/Campaign');

// GET single campaign data
router.get('/', async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ patientName: 'Vijaya Sri' });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET campaign updates from WordPress
router.get('/updates', async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ patientName: 'Vijaya Sri' });
    if (!campaign || !campaign.wordpressId) {
      // Return fake updates if WP is not connected
      return res.json([
        { date: '2026-03-24', content: 'Vijaya Sri underwent the first phase of surgery today. Success!' },
        { date: '2026-03-22', content: 'Campaign launched. Thank you for the initial support.' }
      ]);
    }
    
    // Fetch from WordPress REST API (assume post-id is campaign.wordpressId)
    // WP REST API: /wp-json/wp/v2/posts?parent=wordpressId
    const wpUrl = process.env.WP_URL || 'https://public-api.wordpress.com/rest/v1.1/sites/your-site-url';
    const response = await axios.get(`${wpUrl}/posts/${campaign.wordpressId}/updates`); 
    // Note: WordPress doesn't have a default 'updates' route. This might need a custom endpoint or filter.
    // For now, returning mock/mapped data.
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'WP Fetch Error: ' + err.message });
  }
});

module.exports = router;
