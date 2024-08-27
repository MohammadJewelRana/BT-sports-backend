import { Types } from "mongoose";

 

 
export const NoticeStatus=['pending', 'approved'];
export const BollLostStatus=['pending', 'given'];

export type TNotice = {
  subject: string;
  description: string;
  status: 'pending'| 'approved';
  date:Date;
  isDeleted: boolean;
};


// export type TBallLost = {
//   name: string;
//   ballCount: number;
//   status: 'pending'| 'given';
//   lostDate:string;
//   returnDate?:Date;
//   isDeleted: boolean;
// };



export type TLostDetail= {
  lostDate: string;  
  lostBallCount: number;
}

export type TReturnDetail= {
  returnDate: string; 
  returnedBallCount: number;
}


export type TBallLost = {
  
  id: Types.ObjectId; 
  name: string; 
  totalLost?: number; 
  totalGiven?: number; 
  remaining?: number; 
  lostDetails: TLostDetail[]; 
  returnDetails?: TReturnDetail[]; 
  status: 'pending'| 'given';
  isDeleted: boolean;
};




 