# Full-Stack Crowdfunding Platform (ImpactGuru Clone)

A premium crowdfunding application for medical fundraising with real-time updates, PhonePe payment integration, and WordPress Headless CMS support.

## Project Structure
- **/frontend**: React.js (Vite) + Vanilla CSS (Premium UI)
- **/backend**: Node.js + Express + MongoDB + Socket.io

## Features
- **Campaign Page**: Hero section for Vijaya Sri, progress bars, and social proof.
- **Medical Story & Updates**: Dynamic fetching from WordPress REST API.
- **Donation System**: Integrated with PhonePe UPI (Intent/Collection).
- **Real-time Donors**: Live donor list updates via Socket.io.
- **Admin Panel**: Track donations and campaign progress.
- **Mobile Responsive**: Custom sticky donation card for mobile/desktop.

## Setup Instructions

### 1. Backend
1. Go to `backend/`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   PHONEPE_MERCHANT_ID=PGMDEMO
   PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
   CALLBACK_URL=http://your-domain.com/api/donations/webhook
   WP_URL=https://your-wordpress-site.com/wp-json/wp/v2
   ```
4. Start server: `npm run dev` (or `node server.js`)

### 2. Frontend
1. Go to `frontend/`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

### 3. WordPress Integration
To show medical stories and updates:
1. Create a Post in WP for the campaign.
2. Use the Post ID as `wordpressId` in the Backend's Campaign model.
3. The app will fetch `content.rendered` for the story and children posts/updates.

## Note on Payments
The PhonePe integration uses Sandbox credentials by default. For production:
1. Contact PhonePe Business for Merchant ID and Salt Key.
2. Point `API_URL` to `https://api.phonepe.com/apis/hermes/pg/v1/pay`.
3. Use a static IP/Domain for the Webhook to work correctly.
