import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import FileUploader from '../components/ui/FileUploader';
import { ImportedFile } from '../types';

const ContactImportPage: React.FC = () => {
  const navigate = useNavigate();
  const [importedFile, setImportedFile] = useState<ImportedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileAccepted = (file: ImportedFile) => {
    setImportedFile(file);
    setError(null);
  };

  const handleFileError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleContinue = () => {
    navigate('/compose');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Import Contacts</h1>
          <p className="text-lg text-gray-600">
            Upload a list of contacts to send messages to
          </p>
        </div>
        
        <Card className="mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-600" />
              Contact List Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload a CSV file containing your contacts. The file should include columns for phone numbers and optionally names and emails.
              </p>
              
              <FileUploader 
                onFileAccepted={handleFileAccepted}
                onError={handleFileError}
                className="mt-4"
              />
              
              {error && (
                <div className="p-3 bg-error-50 border border-error-200 rounded text-error-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/numbers')}>
              Back
            </Button>
            <Button 
              onClick={handleContinue}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <h3 className="font-medium text-gray-900 mb-2">CSV Format Example</h3>
          <pre className="bg-white p-3 rounded border border-gray-200 text-xs overflow-x-auto">
            phoneNumber,firstName,lastName,email,tags<br/>
            +12125551234,John,Doe,john@example.com,customer,vip<br/>
            +14155556789,Jane,Smith,jane@example.com,prospect<br/>
            +16505557890,Robert,Johnson,robert@example.com,customer
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContactImportPage;