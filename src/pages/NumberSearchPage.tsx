import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, CheckCircle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PhoneNumber } from '../types';
import { mockAvailableNumbers } from '../data/mockData';

const NumberSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [areaCode, setAreaCode] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<PhoneNumber[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [purchaseComplete, setPurchaseComplete] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const filteredNumbers = areaCode
        ? mockAvailableNumbers.filter(n => n.areaCode.includes(areaCode))
        : mockAvailableNumbers;
      
      setSearchResults(filteredNumbers);
      setIsSearching(false);
    }, 800);
  };

  const handlePurchase = () => {
    if (!selectedNumber) return;
    
    setIsPurchasing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setPurchaseComplete(true);
      setIsPurchasing(false);
    }, 1500);
  };

  const handleContinue = () => {
    navigate('/contacts');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search & Provision Phone Numbers</h1>
          <p className="text-lg text-gray-600">
            Find and purchase phone numbers to use for your SMS campaigns
          </p>
        </div>
        
        <Card className="mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle>Search by Area Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="areaCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Area Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="areaCode"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 pl-10 py-2 border"
                    placeholder="e.g. 415"
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch} 
                  isLoading={isSearching}
                  disabled={isSearching}
                >
                  Search Numbers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {searchResults.length > 0 && (
          <Card className="mb-6 animate-slide-up">
            <CardHeader>
              <CardTitle>Available Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.map((number) => (
                  <div 
                    key={number.id}
                    className={`
                      flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors
                      ${selectedNumber === number.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}
                    onClick={() => setSelectedNumber(number.id)}
                  >
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{number.number}</p>
                        <p className="text-sm text-gray-500">
                          {number.region} • {number.type} • 
                          <span className="ml-1">
                            {number.capabilities.join(', ')}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-3">
                        ${number.monthlyPrice.toFixed(2)}/mo
                      </span>
                      {selectedNumber === number.id && (
                        <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-primary-600"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/contacts')}
              >
                Skip
              </Button>
              <Button 
                disabled={!selectedNumber || isPurchasing || purchaseComplete} 
                isLoading={isPurchasing}
                onClick={handlePurchase}
              >
                {purchaseComplete ? 'Purchased' : 'Purchase Selected Number'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {purchaseComplete && (
          <div className="text-center p-6 bg-success-50 rounded-lg border border-success-200 animate-fade-in mb-6">
            <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Number Purchased Successfully!</h3>
            <p className="text-gray-600 mb-4">The number has been added to your account and connected to your messaging profile.</p>
            <Button onClick={handleContinue}>
              Continue to Contact Import
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberSearchPage;