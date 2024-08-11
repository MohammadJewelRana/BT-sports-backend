import express from 'express';
import { CampaignControllers } from './campaign.controller';
 

const router = express.Router();

router.post('/create-campaign', CampaignControllers.createCampaign);
router.get('/', CampaignControllers.getAllCampaign);

// router.get('/', NoticeControllers.getAllNotice);

export const CampaignRoute = router;
