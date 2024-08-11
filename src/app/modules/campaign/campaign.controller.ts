
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

export const CampaignControllers = {
  createCampaign,
  getAllCampaign
};

