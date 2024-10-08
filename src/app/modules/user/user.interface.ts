import { Types } from "mongoose";

export type TGender = 'male' | 'female' | 'other';

export type TAddress = {
  buildingNumber: string;
  flatNumber: string;
};

export type TUser = {
  name: string;
  profession: string;

  // gender: TGender;

  whatsapp: string;
  address: TAddress;

  profileImg?: string;

  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  isDeleted: boolean;
};

export type TImage = {
  userId: Types.ObjectId; 
    image: string;
 

  isDeleted: boolean;
};
