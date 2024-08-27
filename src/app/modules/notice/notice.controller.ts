
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


const createBallLostList = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await NoticeServices.createBallLostIntoDB(req.body);
 
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created the ball lost list!!',
    data: result,
  });
});

const getAllBallLostList = catchAsync(async (req, res) => {

  const result = await NoticeServices.getAllBallLostFromDB( );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved all ball lost list!!',
    data: result,
  });
});

const deleteBallLost = catchAsync(async (req, res) => {

  const {id}=req.params;
  const result = await NoticeServices.deleteBallLostFromDB( id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted  the ball lost from db!!',
    data: result,
  });
});

const updateBallLostList = catchAsync(async (req, res) => {

  const {id}=req.params;
  const result = await NoticeServices.updateBallListIntoDB( id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated  the ball lost list!!',
    data: result,
  });
});

export const NoticeControllers = {
  createNotice,
  getAllNotice,
  deleteNotice,
  updateNotice,
  createBallLostList,
  getAllBallLostList,
  updateBallLostList,
  deleteBallLost
};

