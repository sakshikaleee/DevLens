import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import * as progressController from '../controllers/progress.controller';

const router = Router();

// All progress routes require authentication
router.get('/dashboard', authenticateToken, progressController.getDashboardStats);
router.get('/weekly-study', authenticateToken, progressController.getWeeklyStudyHours);
router.get('/analytics', authenticateToken, progressController.getLearningAnalytics);

export default router;
