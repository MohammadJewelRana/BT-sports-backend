import { model, Schema } from 'mongoose';
import {  BollLostStatus, NoticeStatus, TBallLost, TNotice } from './notice.interface';

const noticeSchema = new Schema<TNotice>(
  {
    subject: { type: String, required: true },
    description: { type: String, required: true },

    status: { type: String, enum: NoticeStatus, default: 'pending' },
    date: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// const ballLostSchema = new Schema<TBallLost>(
//   {
//     name: { type: String, required: true },
//     ballCount: { type: Number, required: true },
    

//     status: { type: String, enum:BollLostStatus, default: 'pending' },
//     lostDate: { type: String,  },
//     returnDate: { type: Date, default:null },
//     isDeleted: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   },
// );



// Define the LostDetail schema
const LostDetailSchema = new Schema({
  lostDate: { type: Date, required: true },
  lostBallCount: { type: Number, required: true },
});

// Define the ReturnDetail schema
const ReturnDetailSchema = new Schema({
  returnDate: { type: Date, required: true },
  returnedBallCount: { type: Number, required: true },
});

// Define the BallLost schema
const BallLostSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true ,ref:'Users'},
  name: { type: String, required: true },
  totalLost: { type: Number,default:0 },
  totalGiven: { type: Number,default:0  },
  remaining: { type: Number, default:0  },
  lostDetails: [LostDetailSchema], // Array of LostDetail documents
  returnDetails: [ReturnDetailSchema], // Array of ReturnDetail documents
  status: { type: String, enum:BollLostStatus, default: 'pending' },
  isDeleted: { type: Boolean, default: false },
});



export const Notice = model<TNotice>('Notice', noticeSchema);
export const BallLost = model<TBallLost>('BallLost', BallLostSchema);
