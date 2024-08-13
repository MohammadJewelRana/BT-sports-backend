
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

const deleteNotice = catchAsync(async (req, res) => {

  const {id}=req.params;
  const result = await NoticeServices.deleteNotice( id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted  the notice!!',
    data: result,
  });
});

const updateNotice = catchAsync(async (req, res) => {

  const {id}=req.params;
  const result = await NoticeServices.updateNotice( id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated  the notice!!',
    data: result,
  });
});

export const NoticeControllers = {
  createNotice,
  getAllNotice,
  deleteNotice,
  updateNotice
};

