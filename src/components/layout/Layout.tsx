import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import StepProgress from '../StepProgress';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isWorkflow = ['/numbers', '/contacts', '/compose'].includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {isWorkflow && <StepProgress />}
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Telnyx SMS Manager • Internal Tool
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;