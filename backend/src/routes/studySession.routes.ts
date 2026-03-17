import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import * as studySessionController from '../controllers/studySession.controller';

const router = Router();

// All study session routes require authentication
router.post('/start', authenticateToken, studySessionController.startSession);
router.post('/end', authenticateToken, studySessionController.endSession);
router.get('/', authenticateToken, studySessionController.getSessions);
router.get('/:id', authenticateToken, studySessionController.getSessionById);
router.delete('/:id', authenticateToken, studySessionController.deleteSession);

export default router;
