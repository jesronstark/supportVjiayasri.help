import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const UPI_ID = '9047371328@okicici';
const WHATSAPP_NUMBER = '919047371328';
const WHATSAPP_MESSAGE = ` "நீங்கள் தரும் ஒவ்வொரு ரூபாயும் என் மகளின் உயிருக்கு ஒரு புதிய வாய்ப்பாகும்."

தொடர்பு எண் - 9047371328
Gpay number - 9047371328.
Google Pay - 9047371328

This your correct DETAILS I will help you...!!

#SUPPORT-VIJIYASRI.HELP

`;

const DonateCard = ({ campaign, progressPercent, daysLeft }) => {
  const [amount, setAmount] = useState('');
  const [upiCopied, setUpiCopied] = useState(false);

  // Use a GPay-specific intent on Android to bypass the UPI chooser if possible
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Uma&tn=Help%20Vijaya%20Sri&cu=INR&mc=0000`;
  const gpayIntent = `intent://pay?pa=${UPI_ID}&pn=Uma&tn=Help%20Vijaya%20Sri&cu=INR&mc=0000#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
  
  // Decide which link to use based on simple user agent check (or just use intent if preference is strictly GPay)
  const finalLink = /Android/i.test(navigator.userAgent) ? gpayIntent : upiLink;

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

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
          placeholder="Enter the amount to donate"
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
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
          <a 
            href={finalLink} 
            style={{ 
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none', 
              background: '#2563eb', 
              color: 'white', 
              borderRadius: '8px', 
              padding: '0.9rem', 
              fontWeight: 600, 
              fontSize: '1rem',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
            }}
          >
            Donate with Google Pay →
          </a>

          <button 
            onClick={copyUpiId}
            style={{ 
              width: '100%',
              background: '#fff',
              border: '1px solid #d1d5db',
              padding: '0.6rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            {upiCopied ? '✓ UPI ID Copied!' : 'Copy UPI ID'}
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#4b5563', marginTop: '0.75rem' }}>UPI ID: <strong>{UPI_ID}</strong></p>
      </div>

      <button
        onClick={handleWhatsApp}
        style={{ 
          width: '100%', 
          background: 'transparent', 
          color: '#25D366', 
          border: '1px solid #25D366', 
          borderRadius: '8px', 
          padding: '0.8rem', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          fontWeight: 600, 
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
        Share on WhatsApp
      </button>

      <p className="secure-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem' }}>
        <ShieldCheck size={16} color="#10b981" /> <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>100% Verified Directly to Receiver</span>
      </p>
    </div>
  );
};

export default DonateCard;
