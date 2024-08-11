import { Router } from 'express';
import { NoticeRoute } from '../modules/notice/notice.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

//all route in array of object
const moduleRoutes = [
    { path: '/notice', route: NoticeRoute },
    { path: '/user', route: UserRoutes },

];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
