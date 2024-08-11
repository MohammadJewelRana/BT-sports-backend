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

export const NoticeServices = {
  createNoticeIntoDB,
  getAllNoticeFromDB,
};
