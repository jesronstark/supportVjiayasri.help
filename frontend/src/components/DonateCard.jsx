import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { initiateDonation } from '../services/api';

const UPI_ID = '9047371328@okicici';
const DISPLAY_NUMBER = '9047371328';
const WHATSAPP_NUMBER = '919047371328';
const WHATSAPP_MESSAGE = ` "நீங்கள் தரும் ஒவ்வொரு ரூபாயும் என் மகளின் உயிருக்கு ஒரு புதிய வாய்ப்பாகும்."

தொடர்பு எண் - 9047371328
Google Pay - 9047371328

This your correct DETAILS I will help you...!!

#SUPPORT-VIJIYASRI.HELP

`;

const DonateCard = ({ campaign, progressPercent, daysLeft }) => {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);

  // Simplified UPI link with exact banking name for better resolution
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=UMA&cu=INR`;
  const finalLink = upiLink;


  const copyUpiId = () => {
    navigator.clipboard.writeText(DISPLAY_NUMBER);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || amount < 10) return alert('Please enter at least ₹10');
    if (!donorName) return alert('Please enter your name');
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) return alert('Please enter a valid 10-digit mobile number');

    try {
      setLoading(true);
      const res = await initiateDonation({
        campaignId: campaign._id,
        amount: Number(amount),
        donorName,
        mobileNumber,
        message: 'Direct donation from website'
      });

      if (res.data?.success && res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl; // Redirect to GPay/PhonePe gateway
      } else {
        alert('Payment initiation failed. Please try again or use QR code.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to payment server. Please use direct QR code payment.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="card donate-card">
      <div className="custom-input-wrap" style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          className="custom-input small"
          placeholder="Donor Name"
          value={donorName}
          onChange={e => setDonorName(e.target.value)}
          style={{ height: '3rem', fontSize: '0.9rem', padding: '0 0.75rem', marginBottom: '0.75rem' }}
        />
        <input
          type="tel"
          className="custom-input small"
          placeholder="Mobile Number (10 digits)"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
          maxLength={10}
          style={{ height: '3rem', fontSize: '0.9rem', padding: '0 0.75rem', marginBottom: '0.75rem' }}
        />
        <div style={{ position: 'relative' }}>
          <span className="currency-sym" style={{ top: '50%', transform: 'translateY(-50%)', left: '0.75rem' }}>₹</span>
          <input
            type="number"
            className="custom-input"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min={10}
            style={{ height: '3.5rem', paddingLeft: '2rem' }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '1.5rem 1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '1rem', display: 'inline-block', borderRadius: '8px', marginBottom: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <QRCodeSVG value={upiLink} size={180} />
        </div>
        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827' }}>Scan & Pay from any App</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
          <button 
            onClick={handleDonate}
            disabled={loading}
            style={{ 
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none', 
              background: loading ? '#9ca3af' : '#2563eb', 
              color: 'white', 
              border: 'none',
              borderRadius: '8px', 
              padding: '1rem', 
              fontWeight: 600, 
              fontSize: '1rem',
              width: '100%',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
            }}
          >
            {loading ? 'Opening GPay...' : 'PROCEED TO PAY →'}
          </button>

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
            {upiCopied ? '✓ ID Copied!' : 'Copy GPay Number'}
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#4b5563', marginTop: '0.75rem' }}>GPay Number: <strong>{DISPLAY_NUMBER}</strong></p>
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
