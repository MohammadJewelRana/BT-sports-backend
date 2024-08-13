import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TNotice } from './notice.interface';
import { Notice } from './notice.model';

const createNoticeIntoDB = async (payload: TNotice) => {
  //   console.log(payload);
  if (!payload) {
    return new AppError(httpStatus.BAD_REQUEST, 'Please give the data!!');
  }

  const result = await Notice.create(payload);
  return result;
};

const getAllNoticeFromDB = async () => {
  const result = await Notice.find();
  return result;
};


const deleteNotice = async (noticeId: string) => {
  const result = await Notice.findByIdAndDelete({ _id: noticeId });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete notice');
  }

  return result;
};
const updateNotice = async (noticeId: string,   payload) => {
  
  const result = await Notice.findByIdAndUpdate({ _id: noticeId },{$set:{status:payload?.status}});

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update notice');
  }

  return result;
};


export const NoticeServices = {
  createNoticeIntoDB,
  getAllNoticeFromDB,
  deleteNotice,
  updateNotice,
};
