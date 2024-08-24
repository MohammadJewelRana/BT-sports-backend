import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TImage, TUser } from './user.interface';

import { User, Image } from './user.model';

import mongoose from 'mongoose';

const createUserIntoDB = async (payload: TUser) => {
  // console.log(payload);
  const { profileImg } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await User.create(payload);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // console.log(result);
    const userIdNew = result?._id;
    const imageData = { userId: userIdNew, image: profileImg };
    // console.log(imageData);

    const addImage = await Image.create(imageData);

    if (!addImage) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add image');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
    // return null;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, 'something error to add');
  }
};

const updateUserIntoDB = async (userIdClient: string, payload: Partial<TUser>) => {
  console.log(payload);
  const { whatsapp, profileImg } = payload;
  const findUser = await User.findById({ _id: userIdClient });
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }
  const {_id}=findUser;

  const { address, ...remainingUserData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingUserData };

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedData[`address.${key}`] = value;
    }
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const findImage = await Image.findOne({
      userId: _id,
    }).select('image');
    // console.log(findImage);
    if (!findImage) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to  find user image');
    }

    if (findImage.image !== profileImg) {
      // console.log('inner');
      const updateImage = await Image.updateOne(
        { userId: _id },
        { $set: { image: profileImg } },
      );
      // console.log(updateImage);

      if (!updateImage) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to  update user image',
        );
      }
    }


    const result = await User.findByIdAndUpdate(
      { _id: userIdClient },
      {
        $set: modifiedData,
      },
      {
        new: true,
      },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
    // return null;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, 'something error to update');
  }

  // const result = await User.findByIdAndUpdate(
  //   { _id: userId },
  //   {
  //     $set: modifiedData,
  //   },
  //   {
  //     new: true,
  //   },
  // );

  // return result;
};

 
const deleteSingleUser = async (userIdClient: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const findUser = await User.findById(userIdClient).session(session); // Ensure to use the session
    if (!findUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const { _id } = findUser;

    // Delete associated image
    const deleteImgResult = await Image.deleteOne({ userId: _id }).session(session); // Ensure to use the session
    if (deleteImgResult.deletedCount === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete image');
    }

    // Delete user
    const deleteUserResult = await User.findByIdAndDelete(userIdClient).session(session); // Ensure to use the session
    if (!deleteUserResult) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteUserResult;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof AppError) {
      throw error; // Re-throw custom errors
    }

    // Log unexpected errors
    console.error(error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred');
  }
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get all user');
  }

  return result;
};

const getAllImageFromDB = async () => {
  const result = await Image.find({ isDeleted: false });
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
  getAllImageFromDB,
};
