import express from 'express';
import { CampaignControllers } from './campaign.controller';
 

const router = express.Router();

router.post('/create-campaign', CampaignControllers.createCampaign);
router.get('/', CampaignControllers.getAllCampaign);
router.patch('/:id', CampaignControllers.updateCampaign);


router.post('/expense', CampaignControllers.expense);
router.patch('/expense/:id', CampaignControllers.expenseDelete);
router.get('/expense', CampaignControllers.getAllExpense);



// router.get('/', NoticeControllers.getAllNotice);

export const CampaignRoute = router;
