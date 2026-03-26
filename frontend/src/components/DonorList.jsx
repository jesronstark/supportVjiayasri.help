import React from 'react';

const DonorList = ({ donors }) => {
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const getTimeAgo = (ts) => {
    const diff = Date.now() - new Date(ts);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div>
      {donors.slice(0, 10).map((d, i) => (
        <div key={i} className={`donor-item ${d.isNew ? 'new-donor' : ''}`}>
          <div className="donor-avatar">{getInitials(d.donorName)}</div>
          <div style={{ flex: 1 }}>
            <div className="donor-name">{d.donorName}</div>
            {d.message && <div className="donor-msg">"{d.message}"</div>}
            <div className="donor-time">{getTimeAgo(d.timestamp)}</div>
          </div>
          <div className="donor-amount">₹{Number(d.amount).toLocaleString('en-IN')}</div>
        </div>
      ))}
      {donors.length === 0 && <p style={{ color: '#6b7280', fontSize: '.9rem' }}>Be the first to donate!</p>}
    </div>
  );
};

export default DonorList;
