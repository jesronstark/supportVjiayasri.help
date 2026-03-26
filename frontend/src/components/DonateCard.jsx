import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const UPI_ID = 'saravananuma469-1@okicici';
const WHATSAPP_NUMBER = '919047371328';
const WHATSAPP_MESSAGE = ` "நீங்கள் தரும் ஒவ்வொரு ரூபாயும் என் மகளின் உயிருக்கு ஒரு புதிய வாய்ப்பாகும்."

தொடர்பு எண் - 9047371328
Gpay number - 9047371328.
UPI ID - saravananuma469-1@okicici
Account no. 181100050319439
IFSC CODE-TMBL0000181

This your correct DETAILS I will help you...!!

#SUPPORT-VIJIYASRI.HELP

`;

const DonateCard = ({ campaign, progressPercent, daysLeft }) => {
  const [amount, setAmount] = useState(1000);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Donation&am=${amount}&cu=INR`;

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="card donate-card">
      <div className="custom-input-wrap" style={{ marginBottom: '1.5rem' }}>
        <span className="currency-sym">₹</span>
        <input
          type="number"
          className="custom-input"
          placeholder="Other amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={10}
        />
      </div>

      <div style={{ textAlign: 'center', padding: '1.5rem 1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '1rem', display: 'inline-block', borderRadius: '8px', marginBottom: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <QRCodeSVG value={upiLink} size={180} />
        </div>
        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827' }}>Scan & Pay from any UPI App</p>
        <p style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.25rem' }}>UPI ID: <strong>{UPI_ID}</strong></p>
      </div>

      <button
        onClick={handleWhatsApp}
        style={{ 
          width: '100%', 
          background: '#25D366', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          padding: '0.9rem', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          fontWeight: 600, 
          fontSize: '1rem',
          transition: 'background 0.2s ease',
          boxShadow: '0 4px 6px -1px rgba(37, 211, 102, 0.2)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
        Help via WhatsApp
      </button>

      <p className="secure-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem' }}>
        <ShieldCheck size={16} color="#10b981" /> <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>100% Secure Direct Donation</span>
      </p>
    </div>
  );
};

export default DonateCard;
