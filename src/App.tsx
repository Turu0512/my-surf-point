import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard'; // パスはDashboardディレクトリの場所に合わせて調整してください

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/points/:point" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
