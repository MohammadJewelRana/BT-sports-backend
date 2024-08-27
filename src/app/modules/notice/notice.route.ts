import express from 'express';
import { NoticeControllers } from './notice.controller';

const router = express.Router();

router.post('/create-notice', NoticeControllers.createNotice);
router.get('/', NoticeControllers.getAllNotice);
router.delete('/:id', NoticeControllers.deleteNotice);
router.patch('/:id', NoticeControllers.updateNotice);

router.post('/ball-lost/create-ballLost', NoticeControllers.createBallLostList);
router.get('/ball-lost', NoticeControllers.getAllBallLostList);
router.delete('/ball-lost/:id', NoticeControllers.deleteBallLost);
router.patch('/ball-lost/:id', NoticeControllers.updateBallLostList);

export const NoticeRoute = router;
