import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TImage, TUser } from './user.interface';

import { User, Image } from './user.model';

import mongoose from 'mongoose';

const createUserIntoDB = async (payload: TUser) => {
  console.log(payload);
  const { profileImg } = payload;
  const imageData = { image: profileImg };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const addImage = await Image.create(imageData);
    if (!addImage) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add image');
    }

    const result = await User.create(payload);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, 'something error to add');
  }
 
};

const updateUserIntoDB = async (userId: string, payload: Partial<TUser>) => {
  console.log(payload);
  
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
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get all user');
  }

  return result;
};

const getAllImageFromDB = async () => {
  const result = await Image.find({isDeleted:false});
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get all image');
  }

  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ _id: userId });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get single user');
  }

  return result;
};

const loginIntoDB = async (payload) => {
  // console.log(payload);
  const { whatsapp } = payload;

  const user = await User.findOne({ whatsapp: whatsapp, role: 'admin' });
  // console.log(user);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to find user');
  }

  return user;
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  deleteSingleUser,
  getAllUserFromDB,
  getSingleUserFromDB,
  loginIntoDB,
  getAllImageFromDB
};
