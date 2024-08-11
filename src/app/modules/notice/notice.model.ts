import { model, Schema } from 'mongoose';
import { NoticeStatus, TNotice } from './notice.interface';

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

export const Notice = model<TNotice>('Notice', noticeSchema);
