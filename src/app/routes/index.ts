import { Router } from 'express';
import { NoticeRoute } from '../modules/notice/notice.route';

const router = Router();

//all route in array of object
const moduleRoutes = [{ path: '/notice', route: NoticeRoute }];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
