import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import qrImg from '../assets/gpay_new_qr.png';

const WHATSAPP_NUMBER = '919047371328';

const DonateCard = () => {
  const handleDonate = (e) => {
    e.preventDefault();
    const text = `I want to help Save Vijaya Sri. This is your correct account details 
    தொடர்பு எண் - 9047371328
    Gpay number - 9047371328
    Account no. 181100050319439
    IFSC CODE - TMBL0000181 
    Please send me the Payment QR code for quick donation.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="card donate-card">
      <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <div 
          onClick={handleDonate}
          style={{ 
            background: '#fff', 
            padding: '0.5rem', 
            display: 'inline-block', 
            borderRadius: '8px', 
            marginBottom: '1rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
        >
          <img src={qrImg} alt="GPay QR" style={{ width: '100%', maxWidth: '240px', height: 'auto', display: 'block' }} />
        </div>
        
        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#4b5563', marginBottom: '1.25rem' }}>Scan to pay with any UPI app</p>
        
        <button 
          onClick={handleDonate}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#25D366', 
            color: 'white', 
            border: 'none',
            borderRadius: '10px', 
            padding: '1rem', 
            fontWeight: 800, 
            fontSize: '1.1rem',
            width: '100%',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = '#22c35e';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#25D366';
          }}
        >
          <MessageCircle size={20} fill="white" color="#25D366" />
          DONATE VIA WHATSAPP
        </button>
      </div>

      <p className="secure-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem' }}>
        <ShieldCheck size={16} color="#10b981" /> <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>100% Verified Directly to Receiver</span>
      </p>
    </div>
  );
};

export default DonateCard;
