import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Search, Filter, CheckCheck, X, ArrowUp, ArrowDown, RefreshCw, Image as ImageIcon } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Message } from '../types';
import { mockMessages } from '../data/mockData';

type SortField = 'timestamp' | 'status';
type SortDirection = 'asc' | 'desc';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [fromNumberFilter, setFromNumberFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Get unique from numbers for the dropdown
  const uniqueFromNumbers = Array.from(new Set(messages.map(m => m.fromNumber)));

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      searchTerm === '' || 
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.fromNumber.includes(searchTerm) ||
      message.toNumber.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === 'all' || 
      message.status === statusFilter;

    const matchesFromNumber =
      fromNumberFilter === 'all' ||
      message.fromNumber === fromNumberFilter;
    
    return matchesSearch && matchesStatus && matchesFromNumber;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc'
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortField === 'status') {
      return sortDirection === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success-500';
      case 'sent': return 'bg-primary-500';
      case 'failed': return 'bg-error-500';
      case 'received': return 'bg-accent-500';
      default: return 'bg-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Dashboard</h1>
          <p className="text-lg text-gray-600">
            Monitor and analyze all your message activity
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => navigate('/')}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Send New Message
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <div className="p-2 rounded-full bg-primary-100 mr-2">
                <BarChart3 className="h-5 w-5 text-primary-600" />
              </div>
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{messages.length}</div>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <div className="p-2 rounded-full bg-success-100 mr-2">
                <CheckCheck className="h-5 w-5 text-success-600" />
              </div>
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {messages.filter(m => m.status === 'delivered').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <div className="p-2 rounded-full bg-error-100 mr-2">
                <X className="h-5 w-5 text-error-600" />
              </div>
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {messages.filter(m => m.status === 'failed').length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6 animate-slide-up">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center">
              Message History
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm"
                  value={fromNumberFilter}
                  onChange={(e) => setFromNumberFilter(e.target.value)}
                >
                  <option value="all">All Numbers</option>
                  {uniqueFromNumbers.map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>

                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                  <option value="received">Received</option>
                </select>
                
                <Button
                  variant="outline"
                  size="sm"
                  isLoading={isRefreshing}
                  icon={<RefreshCw className="h-4 w-4" />}
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('timestamp')}
                  >
                    <div className="flex items-center">
                      <span>Timestamp</span>
                      {sortField === 'timestamp' && (
                        sortDirection === 'asc' 
                          ? <ArrowUp className="ml-1 h-3 w-3" /> 
                          : <ArrowDown className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedMessages.length > 0 ? (
                  sortedMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(message.status)}`}></div>
                          <span className="text-sm text-gray-900 capitalize">{message.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.fromNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.toNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        <div className="flex items-center">
                          <span className="truncate">{message.content}</span>
                          {message.mediaUrl && (
                            <div className="ml-2 flex-shrink-0">
                              <ImageIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(message.timestamp)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;