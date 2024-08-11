import { Router } from 'express';
import { NoticeRoute } from '../modules/notice/notice.route';
import { UserRoutes } from '../modules/user/user.route';
import { CampaignRoute } from '../modules/campaign/campaign.route';

const router = Router();

//all route in array of object
const moduleRoutes = [
    { path: '/notice', route: NoticeRoute },
    { path: '/user', route: UserRoutes },
    { path: '/campaign', route: CampaignRoute },

];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
