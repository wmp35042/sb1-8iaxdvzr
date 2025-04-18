import { PhoneNumber, Message } from '../types';

export const mockAvailableNumbers: PhoneNumber[] = [
  {
    id: '1a2b3c',
    number: '+1 (415) 555-1234',
    areaCode: '415',
    region: 'California',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.25
  },
  {
    id: '2c3d4e',
    number: '+1 (415) 555-5678',
    areaCode: '415',
    region: 'California',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.25
  },
  {
    id: '3e4f5g',
    number: '+1 (628) 555-9012',
    areaCode: '628',
    region: 'California',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.25
  },
  {
    id: '4g5h6i',
    number: '+1 (212) 555-3456',
    areaCode: '212',
    region: 'New York',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.50
  },
  {
    id: '5i6j7k',
    number: '+1 (312) 555-7890',
    areaCode: '312',
    region: 'Illinois',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.35
  },
  {
    id: '6k7l8m',
    number: '+1 (415) 555-4321',
    areaCode: '415',
    region: 'California',
    type: 'toll-free',
    capabilities: ['sms', 'voice'],
    monthlyPrice: 2.00
  }
];

export const mockOwnedNumbers: PhoneNumber[] = [
  {
    id: '7m8n9o',
    number: '+1 (415) 555-8765',
    areaCode: '415',
    region: 'California',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.25
  },
  {
    id: '8o9p0q',
    number: '+1 (628) 555-4321',
    areaCode: '628',
    region: 'California',
    type: 'local',
    capabilities: ['sms', 'mms', 'voice'],
    monthlyPrice: 1.25
  }
];

export const mockMessages: Message[] = [
  {
    id: '1a2b3c4d',
    fromNumber: '+1 (415) 555-8765',
    toNumber: '+1 (415) 555-9876',
    content: 'Hello! This is a test message.',
    status: 'delivered',
    timestamp: '2025-03-15T14:30:00Z'
  },
  {
    id: '2c3d4e5f',
    fromNumber: '+1 (415) 555-8765',
    toNumber: '+1 (628) 555-5432',
    content: 'Are you available for a call tomorrow?',
    status: 'delivered',
    timestamp: '2025-03-14T17:45:00Z'
  },
  {
    id: '3e4f5g6h',
    fromNumber: '+1 (628) 555-4321',
    toNumber: '+1 (415) 555-1122',
    content: 'Please confirm your appointment for next Tuesday.',
    mediaUrl: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg',
    status: 'sent',
    timestamp: '2025-03-14T09:15:00Z'
  },
  {
    id: '4g5h6i7j',
    fromNumber: '+1 (415) 555-3344',
    toNumber: '+1 (628) 555-4321',
    content: 'I received your message. Thanks!',
    status: 'received',
    timestamp: '2025-03-13T11:20:00Z'
  },
  {
    id: '5i6j7k8l',
    fromNumber: '+1 (415) 555-8765',
    toNumber: '+1 (212) 555-6677',
    content: 'Your order has been shipped!',
    status: 'failed',
    timestamp: '2025-03-12T16:10:00Z'
  }
];