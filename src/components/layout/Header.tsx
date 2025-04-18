import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <MessageSquareText className="h-8 w-8 text-primary-600 mr-2" />
              <span className="text-xl font-semibold text-gray-900">TelnyxSMS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex space-x-4">
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-gray-50">
                Dashboard
              </Link>
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-md hover:bg-gray-50">
                Send Message
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;