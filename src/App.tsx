import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NumberSearchPage from './pages/NumberSearchPage';
import ContactImportPage from './pages/ContactImportPage';
import ComposeMessagePage from './pages/ComposeMessagePage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/numbers" replace />} />
          <Route path="/numbers" element={<NumberSearchPage />} />
          <Route path="/contacts" element={<ContactImportPage />} />
          <Route path="/compose" element={<ComposeMessagePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;