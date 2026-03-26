import React from 'react';

const CampaignUpdates = ({ updates }) => {
  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  if (!updates || updates.length === 0) return <p style={{ color: '#6b7280', fontSize: '.9rem' }}>No updates yet.</p>;

  return (
    <div className="timeline">
      {updates.map((u, i) => (
        <div key={i} className="update-item">
          <div className="update-dot" />
          <div className="update-date">{fmt(u.date)}</div>
          <div className="update-text">{u.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CampaignUpdates;
