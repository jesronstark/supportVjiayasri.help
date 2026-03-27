import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import qrImg from '../assets/gpay-qr.jpg';

const WHATSAPP_NUMBER = '919047371328';

const DonateCard = () => {
  const handleDonate = (e) => {
    e.preventDefault();
    const text = `I want to donate to help Vijaya Sri. Please help me with the payment process.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="card donate-card">
      <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '0.5rem', display: 'inline-block', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <img src={qrImg} alt="GPay QR" style={{ width: '220px', height: 'auto', display: 'block' }} />
        </div>
        
        <p style={{ fontWeight: 600, fontSize: '1rem', color: '#111827', marginBottom: '1.25rem' }}>Scan with GPay/Any App to Donate</p>
        
        <button 
          onClick={handleDonate}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#22c55e', 
            color: 'white', 
            border: 'none',
            borderRadius: '8px', 
            padding: '1.1rem', 
            fontWeight: 800, 
            fontSize: '1.1rem',
            width: '100%',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(34, 197, 94, 0.4)',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.background = '#16a34a';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#22c55e';
          }}
        >
          <MessageCircle size={20} />
          DONATE NOW ON WHATSAPP
        </button>
      </div>

      <p className="secure-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem' }}>
        <ShieldCheck size={16} color="#10b981" /> <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>100% Verified Directly to Receiver</span>
      </p>
    </div>
  );
};

export default DonateCard;
