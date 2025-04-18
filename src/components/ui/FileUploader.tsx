import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, XCircle } from 'lucide-react';
import clsx from 'clsx';
import Papa from 'papaparse';
import { ImportedFile, Contact } from '../../types';
import Button from './Button';

interface FileUploaderProps {
  onFileAccepted: (file: ImportedFile) => void;
  onError?: (error: string) => void;
  className?: string;
  acceptedFileTypes?: string[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileAccepted,
  onError,
  className,
  acceptedFileTypes = ['.csv', '.xlsx', '.xls'],
}) => {
  const [filePreview, setFilePreview] = React.useState<ImportedFile | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setIsProcessing(true);
    setError(null);

    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            const errorMsg = `Error parsing CSV: ${results.errors[0].message}`;
            setError(errorMsg);
            if (onError) onError(errorMsg);
            setIsProcessing(false);
            return;
          }

          try {
            const contacts = results.data.map((row: any, index: number) => ({
              id: `imported-${index}`,
              phoneNumber: row.phoneNumber || row.phone || row.mobile || row['phone number'] || '',
              firstName: row.firstName || row.first || row['first name'] || '',
              lastName: row.lastName || row.last || row['last name'] || '',
              email: row.email || '',
              tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
            }));

            const newFile: ImportedFile = {
              name: file.name,
              size: file.size,
              type: file.type,
              data: contacts,
            };

            setFilePreview(newFile);
            onFileAccepted(newFile);
          } catch (e) {
            const errorMsg = 'Error processing contact data';
            setError(errorMsg);
            if (onError) onError(errorMsg);
          } finally {
            setIsProcessing(false);
          }
        },
      });
    } else {
      const errorMsg = 'Only CSV files are supported at this time';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      setIsProcessing(false);
    }
  }, [onFileAccepted, onError]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
    [processFile],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  const clearFile = () => {
    setFilePreview(null);
    setError(null);
  };

  return (
    <div className={className}>
      {!filePreview ? (
        <div
          {...getRootProps()}
          className={clsx(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-300',
            isDragReject && 'border-error-500 bg-error-50',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-primary-50 rounded-full">
              <Upload className="w-6 h-6 text-primary-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-900">
                {isDragActive ? 'Drop the file here' : 'Upload a file'}
              </h3>
              <p className="text-xs text-gray-500">
                Drag and drop or click to upload a contact list
              </p>
              <p className="text-xs text-gray-500">
                {acceptedFileTypes.join(', ')} supported
              </p>
            </div>
            <Button variant="outline" size="sm">
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0">
              <FileType className="w-10 h-10 text-primary-600" />
            </div>
            <div className="min-w-0 flex-1 pr-6">
              <p className="font-medium text-gray-900 truncate">{filePreview.name}</p>
              <p className="text-sm text-gray-500">
                {filePreview.data.length} contacts • {(filePreview.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="text-gray-500"
                icon={<XCircle className="w-4 h-4" />}
              >
                Remove
              </Button>
            </div>
          </div>
          {filePreview.data.length > 0 && (
            <div className="mt-4 overflow-hidden border rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filePreview.data.slice(0, 3).map((contact: Contact) => (
                      <tr key={contact.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                          {contact.phoneNumber}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                          {[contact.firstName, contact.lastName].filter(Boolean).join(' ')}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                          {contact.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filePreview.data.length > 3 && (
                <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 text-center border-t">
                  + {filePreview.data.length - 3} more contacts
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-error-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUploader;