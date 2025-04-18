export interface PhoneNumber {
  id: string;
  number: string;
  areaCode: string;
  region: string;
  type: string;
  capabilities: string[];
  monthlyPrice: number;
}

export interface Contact {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tags?: string[];
}

export interface Message {
  id: string;
  fromNumber: string;
  toNumber: string;
  content: string;
  mediaUrl?: string;
  status: 'sent' | 'delivered' | 'failed' | 'received';
  timestamp: string;
}

export interface ImportedFile {
  name: string;
  size: number;
  type: string;
  data: Contact[];
}