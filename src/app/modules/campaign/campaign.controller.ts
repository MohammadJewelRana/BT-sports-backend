
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status';
import { CampaignServices } from './campaign.service';

 

const createCampaign = catchAsync(async (req, res) => {
    
  const result = await CampaignServices.createCampaignIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created the Campaign!!',
    data: result,
  });
});

const getAllCampaign = catchAsync(async (req, res) => {

  const result = await CampaignServices.getAllCampaignFromDB( );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved all Campaign!!',
    data: result,
  });
});

const updateCampaign = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CampaignServices.updateCampaign(id,req.body );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated   Campaign!!',
    data: result,
  });
});


const expense = catchAsync(async (req, res) => {
 
  const result = await CampaignServices.expenseIntoDB(req.body );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully added expense    !!',
    data: result,
  });
});

const expenseDelete = catchAsync(async (req, res) => {
 const {id}=req.params;
  const result = await CampaignServices.expenseDeleteFromDB(id  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted expense    !!',
    data: result,
  });
});


const getAllExpense = catchAsync(async (req, res) => {

  const result = await CampaignServices.getAllExpenseFromDB( );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved all Expense!!',
    data: result,
  });
});



const updateExpense = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CampaignServices.updateExpenseIntoDB(id,req.body );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated   Expense!!',
    data: result,
  });
});

export const CampaignControllers = {
  createCampaign,
  getAllCampaign,
  updateCampaign,
  expense,
  expenseDelete,
  getAllExpense,
  updateExpense
};

