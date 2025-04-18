import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Image as ImageIcon, Send } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockOwnedNumbers } from '../data/mockData';

const ComposeMessagePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);
  const MAX_CHAR_COUNT = 160;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, this would upload to a server and get back a URL
      // For now, we'll simulate with a placeholder
      const mockImageUrl = 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg';
      setImageUrl(mockImageUrl);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessageText(text);
    setCharCount(text.length);
  };

  const handleSendMessage = () => {
    if (!selectedNumber || !messageText) return;
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compose Message</h1>
          <p className="text-lg text-gray-600">
            Create your message and choose a sender number
          </p>
        </div>
        
        <Card className="mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary-600" />
              Message Composition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label htmlFor="fromNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  From Number
                </label>
                <select
                  id="fromNumber"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-2 border"
                  value={selectedNumber}
                  onChange={(e) => setSelectedNumber(e.target.value)}
                >
                  <option value="">Select a number</option>
                  {mockOwnedNumbers.map((number) => (
                    <option key={number.id} value={number.number}>
                      {number.number} ({number.areaCode}, {number.region})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="messageText" className="block text-sm font-medium text-gray-700 mb-1">
                  Message Text
                </label>
                <div className="relative">
                  <textarea
                    id="messageText"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-2 border"
                    placeholder="Type your message here..."
                    value={messageText}
                    onChange={handleTextChange}
                    maxLength={MAX_CHAR_COUNT}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {charCount}/{MAX_CHAR_COUNT}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Image (MMS)
                </label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<ImageIcon className="h-4 w-4" />}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  
                  {imageUrl && (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-16 w-16 object-cover rounded border border-gray-200"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 rounded-full bg-white border border-gray-300 p-1"
                        onClick={() => setImageUrl('')}
                      >
                        <svg className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/contacts')}>
              Back
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!selectedNumber || !messageText || isSending}
              isLoading={isSending}
              icon={<Send className="h-4 w-4" />}
              iconPosition="right"
            >
              Send Message
            </Button>
          </CardFooter>
        </Card>
        
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-sm text-primary-700">
          <h3 className="font-medium mb-2">Message Preview</h3>
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 w-4 rounded-full bg-primary-600"></div>
              <p className="text-xs text-gray-500">From: {selectedNumber || 'No number selected'}</p>
            </div>
            <p className="text-gray-800">{messageText || 'Your message will appear here'}</p>
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Message attachment"
                  className="max-h-24 rounded border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMessagePage;