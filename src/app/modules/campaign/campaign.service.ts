import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

import { Campaign, Expense } from './campaign.model';
import { TCampaign, TExpense, TMember } from './campaign.interface';
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
    const members: TMember[] = allUsers.map((user) => ({
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
    return new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create campaign',
    );
  }
};

const getAllCampaignFromDB = async () => {
  const result = await Campaign.find();
  return result;
};

import { ObjectId } from 'mongodb'; // Import ObjectId for conversion

const updateCampaign = async (
  campaignId: string,
  payload: { memberId: string; paidAmount: number },
) => {
  const { memberId, paidAmount } = payload;

  try {
    // Convert memberId and campaignId to ObjectId
    const memberObjectId = new ObjectId(memberId);
    const campaignObjectId = new ObjectId(campaignId);

    // Retrieve the existing campaign
    const campaign = await Campaign.findOne({ _id: campaignObjectId });
    if (!campaign) {
      throw new Error(`Campaign with ID ${campaignId} not found`);
    }

    // Check if the member exists in the campaign
    const memberExists = campaign.members.some(
      (member) => member.id.toString() === memberObjectId.toString(),
    );
    if (!memberExists) {
      throw new Error(`Member with ID ${memberId} not found in the campaign`);
    }

    // Update the member's paidAmount in the members array
    const updatedMembers = campaign.members.map((member) => {
      if (member.id.toString() === memberObjectId.toString()) {
        return {
          ...member,
          paidAmount: paidAmount,
          paymentStatus: 'paid', // Optionally update the payment status
        };
      }
      return member;
    });

    // Update the campaign with the modified members array
    const result = await Campaign.findOneAndUpdate(
      { _id: campaignObjectId },
      { $set: { members: updatedMembers } }, // Use $set to ensure proper update
      { new: true }, // Return the updated document
    );

    return result;
  } catch (error) {
    console.error('Update Error:', error);
    throw error;
  }
};

const expenseIntoDB = async (payload: TExpense) => {
  // console.log(payload);
  // const {grandTotal}=payload;

  const total = payload?.ballCost + payload?.tapeCost;
  payload.totalCost = total;

  const result = await Expense.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to  add expense  ');
  }

  return result;
};

const expenseDeleteFromDB = async (expenseId: string) => {
  console.log(expenseId);
  const result = await Expense.findByIdAndUpdate(
    { _id: expenseId },
    { $set: { isDeleted: true } },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to  delete expense  ');
  }

  return result;
};

const getAllExpenseFromDB = async () => {
  const result = await Expense.find({ isDeleted: false }).sort({ buyDate: -1 });
  return result;
};
export const CampaignServices = {
  createCampaignIntoDB,
  getAllCampaignFromDB,
  updateCampaign,
  expenseIntoDB,
  expenseDeleteFromDB,
  getAllExpenseFromDB,
};
