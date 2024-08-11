import express from 'express';
import { NoticeControllers } from './notice.controller';

const router = express.Router();

router.post('/create-notice', NoticeControllers.createNotice);
router.get('/', NoticeControllers.getAllNotice);

export const NoticeRoute = router;
