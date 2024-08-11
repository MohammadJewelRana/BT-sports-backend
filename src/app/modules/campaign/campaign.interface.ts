import { Types } from "mongoose";

export const campaignStatus = ['pending', 'ongoing', 'end'];

export type TMember = {
  id: Types.ObjectId; 
  name: string; 
  image?: string; 
  paymentStatus: 'paid' | 'unpaid'; 
  paidAmount: number; 
};

export type TCampaign = {
  purpose: string;
  startDate: Date;
  endDate: Date;

  status: 'pending' | 'ongoing' | 'end';
  members: TMember[];
  grandTotal:number;

  isDeleted: boolean;
};
