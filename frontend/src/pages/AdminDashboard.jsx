import React, { useState, useEffect } from 'react';
import { getDonors, getCampaign } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, dRes] = await Promise.all([getCampaign(), getDonors()]);
        setCampaign(cRes.data);
        setDonations(dRes.data);
      } catch {
        // Mock fallback
        setCampaign({ title: "Support Vijaya Sri's Urgent Liver Transplant", raisedAmount: 487500, targetAmount: 2300000, donorCount: 163 });
        setDonations([
          { donorName: 'Rahul S.', amount: 2000, paymentStatus: 'SUCCESS', timestamp: new Date() },
          { donorName: 'Amita M.', amount: 1000, paymentStatus: 'SUCCESS', timestamp: new Date() },
          { donorName: 'Anonymous', amount: 500, paymentStatus: 'PENDING', timestamp: new Date() },
          { donorName: 'Kiran P.', amount: 5000, paymentStatus: 'SUCCESS', timestamp: new Date(Date.now()-86400000) },
          { donorName: 'Sunita K.', amount: 1500, paymentStatus: 'SUCCESS', timestamp: new Date(Date.now()-172800000) },
        ]);
      }
    };
    load();
  }, []);

  const progress = campaign ? Math.round((campaign.raisedAmount / campaign.targetAmount) * 100) : 0;
  const successCount = donations.filter(d => d.paymentStatus === 'SUCCESS').length;
  const totalCollected = donations.filter(d => d.paymentStatus === 'SUCCESS').reduce((s, d) => s + d.amount, 0);

  return (
    <div className="admin-page">
      <div className="admin-nav">
        <h2>🛡️ Admin Panel — CrowdHelp</h2>
        <Link to="/" style={{ color: '#94a3b8', fontSize: '.875rem', marginLeft: 'auto', textDecoration: 'none' }}>← Back to Campaign</Link>
      </div>
      <div className="admin-body">
        <h2 style={{ marginBottom: '1rem', fontWeight: 800 }}>Campaign: {campaign?.title}</h2>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card green">
            <h3>Total Raised</h3>
            <div className="big-num">₹{(totalCollected || campaign?.raisedAmount || 0).toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '.8rem', color: '#6b7280', marginTop: '.25rem' }}>of ₹{(campaign?.targetAmount || 0).toLocaleString('en-IN')} goal · {progress}%</div>
          </div>
          <div className="stat-card blue">
            <h3>Total Donors</h3>
            <div className="big-num">{campaign?.donorCount || 0}</div>
            <div style={{ fontSize: '.8rem', color: '#6b7280', marginTop: '.25rem' }}>{successCount} successful payments</div>
          </div>
          <div className="stat-card red">
            <h3>Days Remaining</h3>
            <div className="big-num">5</div>
            <div style={{ fontSize: '.8rem', color: '#6b7280', marginTop: '.25rem' }}>Campaign ends 31 Mar 2026</div>
          </div>
        </div>

        {/* Progress */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
            <span style={{ fontWeight: 700 }}>Funding Progress</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{progress}%</span>
          </div>
          <div className="progress-bar" style={{ height: 14 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Donations Table */}
        <h3 style={{ marginBottom: '.75rem', fontWeight: 700 }}>Donation History ({donations.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, i) => (
                <tr key={i}>
                  <td style={{ color: '#9ca3af' }}>{i + 1}</td>
                  <td><strong>{d.donorName}</strong></td>
                  <td style={{ fontWeight: 700 }}>₹{Number(d.amount).toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`pill pill-${d.paymentStatus?.toLowerCase()}`}>{d.paymentStatus}</span>
                  </td>
                  <td style={{ color: '#6b7280', fontSize: '.85rem' }}>{new Date(d.timestamp).toLocaleString('en-IN')}</td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>No donations yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
