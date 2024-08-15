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
  const result = await Campaign.find({ isDeleted: false });
  // const result = await Campaign.find({isDeleted:false},{sort:{createdAt:-1}});
  return result;
};

const updateCampaign = async (campaignId: string, payload) => {
  console.log(payload);
  const { status, paidAmount, memberId } = payload;

  const { ...remainingCampaignData } = payload; //destructure the all object field

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCampaignData,
  };
  if (status === 'delete') {
    modifiedUpdatedData.isDeleted = true;
    delete modifiedUpdatedData.status;
  }

  if (paidAmount && memberId) {
    const campaign = await Campaign.findOne({ _id: campaignId }).select(
      'members',
    );

    campaign?.members?.forEach((member) => {
      if (member.id.toString() === memberId) {
        // console.log(member);

        member.paidAmount = paidAmount;
        member.paymentStatus = paidAmount > 0 ? 'paid' : 'unpaid';
      }
    });

    // console.log(campaign?.members);
    // modifiedUpdatedData.members = campaign?.members;
    const grandTotal = campaign?.members?.reduce((total, member) => total + member.paidAmount, 0) || 0;

    modifiedUpdatedData.members = campaign?.members;
    modifiedUpdatedData.grandTotal = grandTotal;


  }

  console.log(modifiedUpdatedData);

  const result = await Campaign.findOneAndUpdate(
    { _id: campaignId },
    { $set: modifiedUpdatedData },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to   update campaign  ');
  }
  return result;

   
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
