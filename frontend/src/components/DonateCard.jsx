import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import qrImg from '../assets/gpay_new_qr.png';

const WHATSAPP_NUMBER = '919047371328';

const DonateCard = () => {
  const handleDonate = (e) => {
    e.preventDefault();
    const text = `I want to help Save Vijaya Sri. This is your correct account details 
    தொடர்பு எண் - 9047371328
    UPI number - 9047371328
    upi - saravananuma469@okhdfcbank
    Account no. 181100050319439
    IFSC CODE - TMBL0000181 
    Please send me the Payment QR code for quick donation.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <div className="card donate-card">
      <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '0.5rem', display: 'inline-block', borderRadius: '8px', marginBottom: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <img src={qrImg} alt="UPI QR" style={{ width: '100%', maxWidth: '240px', height: 'auto', display: 'block' }} />
        </div>
        
        <p style={{ fontWeight: 600, fontSize: '0.82rem', color: '#6b7280', marginBottom: '1.25rem' }}>Scan QR to Pay</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            onClick={handleDonate}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              background: 'white', 
              color: '#128C7E', 
              border: '1px solid #128C7E',
              borderRadius: '10px', 
              padding: '0.75rem', 
              fontWeight: 700, 
              fontSize: '0.9rem',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <MessageCircle size={16} />
            DONATE VIA WHATSAPP
          </button>
        </div>
      </div>

      <p className="secure-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem' }}>
        <ShieldCheck size={16} color="#10b981" /> <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>100% Verified Directly to Receiver</span>
      </p>
    </div>
  );
};

export default DonateCard;
