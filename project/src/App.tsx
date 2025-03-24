import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Report from './pages/Report';
import Incidents from './pages/Incidents';
import Alerts from './pages/Alerts';
import Admin from './pages/Admin';
import Resources from './pages/Resources';
import Guidelines from './pages/Guidelines';
import Dashboard from './pages/Dashboard';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatbot from './components/Chatbot';
import RequestResource from './pages/RequestResource';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request-resource" element={<RequestResource />} />
        </Routes>
        <Chatbot />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;