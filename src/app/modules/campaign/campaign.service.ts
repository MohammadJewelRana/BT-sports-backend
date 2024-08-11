import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
 
import { Campaign } from './campaign.model';
import { TCampaign, TMember } from './campaign.interface';
import { User } from '../user/user.model';

const createCampaignIntoDB = async (payload: TCampaign) => {
  //   console.log(payload);
  if (!payload) {
    return new AppError(httpStatus.BAD_REQUEST, 'Please give the data!!');
  }  
  try {
    // Fetch active users
    const allUsers = await User.find({ status: 'active' });
    
    if (!allUsers || allUsers.length === 0) {
      return new AppError(httpStatus.BAD_REQUEST, 'No active users found.');
    }

    // Transform users into members format
    const members: TMember[] = allUsers.map(user => ({
        id: user._id, // Mongoose ObjectId
        name: user.name,
        image: user.profileImg || undefined, // Use undefined if no image
        paymentStatus: 'unpaid', // Default value
        paidAmount: 0, // Default value
      }));

    // Create campaign with the populated members array
    const campaignData: TCampaign = {
      ...payload,
      members,
    };

    const result = await Campaign.create(campaignData);
    return result;
  } catch (error) {
    console.error('Error creating campaign:', error);
    return new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create campaign');
  }





//   const allUser=await User.find({status:'active'});
//   if (!allUser) {
//     return new AppError(httpStatus.BAD_REQUEST, 'can not fetch all user');
//   }

  

//   const result = await Campaign.create(payload);
//   return result;
// return null;



};

const getAllCampaignFromDB = async () => {
  const result = await Campaign.find();
  return result;
};

export const CampaignServices = {
  createCampaignIntoDB,
  getAllCampaignFromDB,
};
