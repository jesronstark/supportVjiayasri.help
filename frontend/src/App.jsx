import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignDetail from './pages/CampaignDetail.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampaignDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/donation-success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
