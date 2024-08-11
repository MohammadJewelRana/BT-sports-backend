
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status';
import { NoticeServices } from './notice.service';
 

const createNotice = catchAsync(async (req, res) => {
    
  const result = await NoticeServices.createNoticeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created the notice!!',
    data: result,
  });
});

const getAllNotice = catchAsync(async (req, res) => {

  const result = await NoticeServices.getAllNoticeFromDB( );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved all notice!!',
    data: result,
  });
});

export const NoticeControllers = {
  createNotice,
  getAllNotice
};

