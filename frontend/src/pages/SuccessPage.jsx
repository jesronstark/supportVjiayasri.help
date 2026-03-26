import React from 'react';
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SuccessPage = () => {
  const [params] = useSearchParams();
  const txn = params.get('txn') || 'N/A';
  const url = window.location.origin;

  const handleShare = () => {
    const text = `🎉 I just donated to help Vijaya Sri get her kidney transplant! Join me in saving her life: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="success-page">
      <Navbar />
      <div className="container">
        <div className="success-box card" style={{ marginTop: '2.5rem' }}>
          <div className="success-icon">
            <CheckCircle size={40} color="#10b981" />
          </div>
          <h1 className="success-title">🎉 Thank You!</h1>
          <p className="success-sub">Your donation has been received. You are helping Vijaya Sri stay alive. God bless you.</p>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '.85rem', color: '#065f46', margin: 0 }}>Transaction ID: <strong>{txn}</strong></p>
          </div>
          <p style={{ fontStyle: 'italic', color: '#6b7280', fontSize: '.9rem', marginBottom: '1.5rem' }}>
            "Every small act of kindness has the power to move mountains." — Please share to help us reach more people.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-whatsapp" onClick={handleShare} style={{ padding: '.75rem 1.5rem' }}>
              <MessageCircle size={18} /> Share on WhatsApp
            </button>
            <Link to="/">
              <button className="btn-copy" style={{ padding: '.75rem 1.5rem' }}>
                <ArrowLeft size={18} /> Back to Campaign
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
