import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TBallLost, TNotice } from './notice.interface';
import { BallLost, Notice } from './notice.model';
import { User } from '../user/user.model';

const createNoticeIntoDB = async (payload: TNotice) => {
  //   console.log(payload);
  if (!payload) {
    return new AppError(httpStatus.BAD_REQUEST, 'Please give the data!!');
  }

  const result = await Notice.create(payload);
  return result;
};

const getAllNoticeFromDB = async () => {
  const result = await Notice.find();
  return result;
};

const deleteNotice = async (noticeId: string) => {
  const result = await Notice.findByIdAndDelete({ _id: noticeId });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete notice');
  }

  return result;
};
const updateNotice = async (noticeId: string, payload) => {
  const result = await Notice.findByIdAndUpdate(
    { _id: noticeId },
    { $set: { status: payload?.status } },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update notice');
  }

  return result;
};

const createBallLostIntoDB = async (payload: TBallLost) => {
  // console.log(payload);

  if (!payload) {
    return new AppError(httpStatus.BAD_REQUEST, 'Please give the data!!');
  }

  const { id, lostBallCount, lostDate, name } = payload;
  const userExists = await User.findOne({ _id: id });
  // console.log(userExists);

  if (!userExists) {
    return new AppError(
      httpStatus.BAD_REQUEST,
      'Please give the valid user id!!',
    );
  }

  const findBallLost = await BallLost.findOne({ id: id });
  // console.log(findBallLost);
  if (!findBallLost) {
    // console.log(payload);
    // console.log('if');

    const newData = {
      id,
      name,
      totalLost: lostBallCount,
      lostDetails: [{ lostDate: lostDate, lostBallCount: lostBallCount }],
    };
    // console.log(newData);
    const result = await BallLost.create(newData);
    return result;
  } else {
    // console.log('else');
    const { lostDetails, totalLost, totalGiven, remaining } = findBallLost;
    console.log(lostDetails, totalGiven, totalLost, remaining);

    const newLostDetail = {
      lostDate: lostDate,
      lostBallCount: lostBallCount,
    };

    const updatedTotalLost =
      findBallLost.totalLost + newLostDetail.lostBallCount;
    const updatedRemaining = updatedTotalLost - findBallLost?.totalGiven;

    // Add new lost detail to lostDetails array
    findBallLost.lostDetails.push(newLostDetail);
    findBallLost.totalLost = updatedTotalLost;
    findBallLost.remaining = updatedRemaining;

    const updatedBallLost = await findBallLost.save();
    return updatedBallLost;
  }
};

const getAllBallLostFromDB = async () => {
  const result = await BallLost.find();
  return result;
};

const deleteBallLostFromDB = async (ballLostId: string) => {
  const result = await BallLost.findByIdAndDelete({ _id: ballLostId });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete lost list');
  }

  return result;
};

const updateBallListIntoDB = async (
  ballLostId: string,
  payload: TReturnDetail,
) => {
  console.log(payload, ballLostId);

  // Find the ball lost entry by ID
  const findBallLost = await BallLost.findById(ballLostId);
  if (!findBallLost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update');
  }

  const { returnDetails, totalGiven, remaining } = findBallLost;

  returnDetails?.push(payload);

  const updatedTotalGiven = totalGiven + payload.returnedBallCount;
  const updatedRemaining = findBallLost?.totalLost - updatedTotalGiven;

  const result = await BallLost.findByIdAndUpdate(
    { _id: ballLostId },
    {
      $set: {
        returnDetails: returnDetails,
        totalGiven: updatedTotalGiven,
        remaining: updatedRemaining,
      },
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update the ball lost entry',
    );
  }

  return result;
};

export const NoticeServices = {
  createNoticeIntoDB,
  getAllNoticeFromDB,
  deleteNotice,
  updateNotice,
  createBallLostIntoDB,
  getAllBallLostFromDB,
  deleteBallLostFromDB,
  updateBallListIntoDB,
};
