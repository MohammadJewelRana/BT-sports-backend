import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';

import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  // console.log(payload);

  const result = await User.create(payload);
  return result;
};

const updateUserIntoDB = async (userId: string, payload: Partial<TUser>) => {
  const { address, ...remainingUserData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingUserData };

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedData[`address.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: modifiedData,
    },
    {
      new: true,
    },
  );

  return result;
};

const deleteSingleUser = async (userId: string) => {
  const result = await User.findByIdAndDelete({ _id: userId });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  }

  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();

  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ _id: userId });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  deleteSingleUser,
  getAllUserFromDB,
  getSingleUserFromDB,
};
