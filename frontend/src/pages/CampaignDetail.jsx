import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Heart, Users, Clock, AlertTriangle, Copy, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getCampaign, getDonors, getUpdates, socket } from '../services/api';
import Navbar from '../components/Navbar';
import DonateCard from '../components/DonateCard';
import DonorList from '../components/DonorList';
import CampaignUpdates from '../components/CampaignUpdates';
import '../styles/App.css';

import coverImg from '../assets/vijaya-sri-2.jpg';
import galleryImg1 from '../assets/vijaya-sri-1.jpg';
 
import galleryImg3 from '../assets/vijaya-sri-3.jpg';

const COVER_IMG = coverImg;
const GALLERY = [
  galleryImg1,
 
  galleryImg3,
];

const STORY_HTML = `
<p>மதிப்பிற்குரிய ஐயா / அம்மா,
[Vijaya Sri] எனது மகள் அவசர கல்லீரல் மாற்று அறுவை சிகிச்சைக்கான நிதி உதவி கோருவதற்காக இக்கடிதத்தை எழுதுகிறேன். தற்போது அவர்கள் (Rela Hospital, Chennai] மருத்துவமனையில் சிகிச்சை பெற்று வருகிறார், மேலும் மருத்தவர்கள் உடனடி கல்லீரல் மாற்று அறுவை சிகிச்சை அவசியம் என்று அறிவுறுத்தியுள்ளனர். நோயாளி மிகவும் மோசமான நிலையில் ICU-வில் அனுமதிக்கப்பட்டுள்ளார். மேலும், இந்த அறுவை சிகிச்சை சில நாட்களுக்குள் அவசரமாக செய்யப்பட வேண்டும் என்று மருத்தவர்கள் கூறியுள்ளனர்.
இந்த அறுவை சிகிச்சைக்கான மொத்த செலவு சுமார் ₹23,00,000 ஆகும், இது எங்களின் பொருளாதார நிலைக்கு மிக அதிகமாக உள்ளது.
இந்த உயிர் காக்கும் சிகிச்சையை மேற்கொள்ள உங்கள் ஆதரவை பணிவுடன் கேட்டுக்கொள்கிறோம். தேவையான அனைத்து மருத்துவ அறிக்கைகள் மற்றும் ஆவணங்கள் இக்கடிதத்துடன் இணைக்கப்பட்டுள்ளது. உங்கள் உதவிக்கு எங்கள் மனமார்ந்த நன்றியை தெரிவித்துக்கொள்கிறோம். இந்த அறுவை சிகிச்சை தான் நோயாளியின் உயிரைக் காப்பாற்றும் ஒரே நம்பிக்கையாக உள்ளது.
நன்றி.

உங்கள் சிறிய உதவி கூட எங்களுக்கு மிகப்பெரிய நம்பிக்கையாக இருக்கும். தேவையான அனைத்து மருத்துவ அறிக்கைகளும் இத்துடன் இணைக்கப்பட்டுள்ளது.

உங்கள் கருணையும் உதவியும் எங்கள் குடும்பத்திற்கு ஒரு புதிய உயிராக இருக்கும்.


உங்கள் உண்மையுடன்,
உமா.</p>
`;

const CampaignDetail = () => {
  const [campaign, setCampaign] = useState(null);
  const [donors, setDonors] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [activeImg, setActiveImg] = useState(COVER_IMG);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [todayCount] = useState(Math.floor(Math.random() * 20) + 12);

  useEffect(() => {
    const allImages = [COVER_IMG, ...GALLERY];
    const timer = setInterval(() => {
      setActiveImg(prev => {
        const currentIndex = allImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % allImages.length;
        return allImages[nextIndex];
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, dRes, uRes] = await Promise.all([getCampaign(), getDonors(), getUpdates()]);
        setCampaign(cRes.data);
        setDonors(dRes.data);
        setUpdates(uRes.data);
      } catch (e) {
        // Use mock data if backend is not connected
        setCampaign({
          _id: 'mock1',
          title: "Help Save Vijaya Sri's Life - Urgent Kidney Transplant",
          patientName: 'Vijaya Sri',
          targetAmount: 1500000,
          raisedAmount: 487500,
          donorCount: 163,
          isUrgent: true,
          expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        });
        setDonors([
          // { donorName: 'Rahul S.', amount: 2000, message: 'Get well soon Vijaya ji!', timestamp: new Date(), paymentStatus: 'SUCCESS' },
          // { donorName: 'Amita M.', amount: 1000, message: 'Praying for you 🙏', timestamp: new Date(Date.now()-3600000), paymentStatus: 'SUCCESS' },
          // { donorName: 'Anonymous', amount: 500, message: 'Stay strong!', timestamp: new Date(Date.now()-7200000), paymentStatus: 'SUCCESS' },
          // { donorName: 'Kiran P.', amount: 5000, message: 'Hope you recover soon', timestamp: new Date(Date.now()-86400000), paymentStatus: 'SUCCESS' },
          // { donorName: 'Sunita K.', amount: 1500, message: 'God bless you and your family', timestamp: new Date(Date.now()-172800000), paymentStatus: 'SUCCESS' },
        ]);
        setUpdates([
          { date: new Date(Date.now()-86400000), content: 'Medical evaluation complete. Surgery scheduled next week. Thank you for your overwhelming support!' },
          { date: new Date(Date.now()-259200000), content: 'Campaign launched. We have received initial support from 40 donors in just 24 hours.' },
          { date: new Date(Date.now()-432000000), content: 'Vijaya Sri admitted to Apollo Hospitals, Hyderabad. Doctors have confirmed the need for immediate surgery.' },
        ]);
      }
    };
    load();

    socket.on('newDonation', (d) => {
      setDonors(prev => [{ ...d, isNew: true }, ...prev]);
      setCampaign(prev => prev ? { ...prev, raisedAmount: prev.raisedAmount + d.amount, donorCount: prev.donorCount + 1 } : prev);
    });
    return () => socket.off('newDonation');
  }, []);

  const handleShare = () => {
    const text = `🙏 Please help save Vijaya Sri's life! She needs urgent kidney transplant surgery.
    
    Account Details:
    தொடர்பு எண் - 9047371328
    Gpay number - 9047371328
    upi - saravananuma469@okhdfcbank
    Account no. 181100050319439
    IFSC CODE - TMBL0000181

    Click here to see the campaign: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSimpleDonate = (e) => {
    e.preventDefault();
    const text = `I want to help Save Vijaya Sri. This is your correct account details 
    தொடர்பு எண் - 9047371328
    Gpay number - 9047371328
    upi - saravananuma469@okhdfcbank
    Account no. 181100050319439
    IFSC CODE - TMBL0000181 
    Please send me the Payment QR code for quick donation.`;
    const whatsappUrl = `https://wa.me/919047371328?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!campaign) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading campaign...</p>
      </div>
    );
  }

  const progressPercent = Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100);
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.expiryDate) - Date.now()) / 86400000));

  return (
    <div>
      {/* Urgent Banner */}
      {campaign.isUrgent && (
        <div className="urgent-banner">
          <span className="ticker">🚨 URGENT — Only {daysLeft} days left to save Vijaya Sri's life. Every donation counts!</span>
        </div>
      )}

      <Navbar />

      <div className="container" style={{ paddingBottom: '5rem' }}>

        {/* Header */}
        <div className="campaign-header">
          <div className="badge-row">
            {campaign.isUrgent && <span className="badge badge-urgent"><AlertTriangle size={12} /> Urgent Medical</span>}
            <span className="badge badge-verified">✓ Verified Campaign</span>
            <span className="badge badge-matched">💚 Donations Matched</span>
          </div>
          <h1 className="campaign-title">{campaign.title}</h1>
          <p className="campaign-subtitle">For <strong>{campaign.patientName}</strong> · Apollo Hospitals, Hyderabad</p>
        </div>

        <div className="campaign-grid">
          {/* LEFT COLUMN */}
          <div>
            {/* Cover Image */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="cover-wrap">
                <img src={activeImg} alt="Campaign" className="cover-img" />
                <div className="cover-overlay">
                  <div className="cover-patient">👩 {campaign.patientName}</div>
                  <div className="cover-hospital">🏥 Apollo Hospitals, Hyderabad</div>
                </div>
              </div>
              <div style={{ padding: '.75rem 1rem' }}>
                <div className="gallery-row">
                  {[COVER_IMG, ...GALLERY].map((img, i) => (
                    <img key={i} src={img} alt="" className={`gallery-thumb ${activeImg===img?'active':''}`} onClick={() => setActiveImg(img)} />
                  ))}
                </div>
              </div>
            </div>

            {/* Social proof bar */}
            <div className="card" style={{ padding: '.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
              <div className="social-proof">
                <div className="dot" />
                <span>{todayCount} people donated <strong>today</strong></span>
              </div>
              {/* <div style={{ fontSize: '.82rem', color: '#6b7280' }}>
                <Users size={13} style={{ verticalAlign: 'middle' }} /> {campaign.donorCount} total donors
              </div> */}
            </div>

            {/* Medical Story */}
            <div className="card">
              <div className="section-title"><Heart size={18} color="#ef4444" /> Vijaya Sri's Story</div>
              <div className="story-body">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(storyExpanded ? STORY_HTML : STORY_HTML.substring(0, 280) + '...') }} />
              </div>
              <button className="read-more-btn" onClick={() => setStoryExpanded(!storyExpanded)}>
                {storyExpanded ? <><ChevronUp size={14}/> Read Less</> : <><ChevronDown size={14}/> Read Full Story</>}
              </button>
            </div>

            {/* Updates */}
            <div className="card">
              <div className="section-title">📋 Campaign Updates ({updates.length})</div>
              <CampaignUpdates updates={updates} />
            </div>

            {/* Donors */}
            <div className="card">
              <div className="section-title"><Users size={18} /> Recent Donors</div>
              <DonorList donors={donors} />
            </div>
          </div>

          {/* RIGHT COLUMN (sticky) */}
          <div className="sticky-col">
            <DonateCard campaign={campaign} progressPercent={progressPercent} daysLeft={daysLeft} />

            {/* Share Box */}
            <div className="card share-box">
              <h4>💬 Help by sharing</h4>
              <p style={{ fontSize:'.82rem', color:'#6b7280', marginBottom:'.75rem' }}>Sharing is the #1 way to reach the goal faster!</p>
              <div className="share-buttons">
                <button className="btn-whatsapp" onClick={handleShare}>
                  <MessageCircle size={16} /> WhatsApp
                </button>
                <button className="btn-copy" onClick={handleCopy}>
                  <Copy size={16} /> {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              {copied && <p className="copy-success">✓ Link copied to clipboard</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky donate bar */}
      <div className="mobile-donate-bar" style={{ 
        padding: '0.75rem 1rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <button 
          onClick={handleSimpleDonate}
          className="btn-whatsapp-automation" 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            width: '100%', 
            background: '#25D366', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
            animation: 'pulse-whatsapp 2s infinite',
            fontWeight: 800,
            fontSize: '1.1rem',
            lineHeight: '1.2rem',
            padding: '1rem',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }} 
        >
          <MessageCircle size={22} fill="white" color="#25D366" />
          <span>HELP VIJAYA SRI ON WHATSAPP</span>
        </button>
      </div>

      <style>{`
        @keyframes pulse-whatsapp {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </div>
  );
};

export default CampaignDetail;
