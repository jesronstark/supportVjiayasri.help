import React from 'react';
import { ShieldCheck } from 'lucide-react';

const DonateCard = () => {
  return (
    <div className="card donate-card">
      <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '1rem' }}>Support Vijaya Sri</p>
        <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1.5rem' }}>
          Please use the Bank Transfer details provided on the page to make your contribution.
        </p>
      </div>


      <p className="secure-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem' }}>
        <ShieldCheck size={16} color="#10b981" /> <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>100% Verified Directly to Receiver</span>
      </p>
    </div>
  );
};

export default DonateCard;
