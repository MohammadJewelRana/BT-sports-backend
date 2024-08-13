import express from 'express';
import { NoticeControllers } from './notice.controller';

const router = express.Router();

router.post('/create-notice', NoticeControllers.createNotice);
router.get('/', NoticeControllers.getAllNotice);
router.delete('/:id', NoticeControllers.deleteNotice);
router.patch('/:id', NoticeControllers.updateNotice);

export const NoticeRoute = router;
