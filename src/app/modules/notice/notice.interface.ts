 

 
export const NoticeStatus=['pending', 'approved'];

export type TNotice = {
  subject: string;
  description: string;
  status: 'pending'| 'approved';
  date:Date;
  isDeleted: boolean;
};

 