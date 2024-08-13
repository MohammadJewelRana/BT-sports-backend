import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
   

  // console.log(req.body);
  
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const updateUser= catchAsync(async (req, res) => {
 const {id}=req.params;

  const result = await UserServices.updateUserIntoDB(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  User updated successfully',
    data: result,
  });
});

const deleteUser= catchAsync(async (req, res) => {
  const {  id } = req.params;

  const result = await UserServices.deleteSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
 

  const result = await UserServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All User data retrieved  successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' single user data is retrieved successfully',
    data: result,
  });
});





const login = catchAsync(async (req, res) => {
 

  const result = await UserServices.loginIntoDB( req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  successfully logged in !!',
    data: result,
  });
});

export const UserControllers = {
 createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  login,
};
