import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route shows login */}
        <Route path="/" element={<Login />} />

        {/* After login, show the dashboard */}
        <Route path="/dashboard" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;


