
import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import * as topicController from '../controllers/topic.controller';


const router = Router();

// All topic routes require authentication
router.post('/', authenticateToken, topicController.createTopic);
router.get('/', authenticateToken, topicController.getAllTopics);
router.get('/:id', authenticateToken, topicController.getTopicById);
router.put('/:id', authenticateToken, topicController.updateTopic);
router.delete('/:id', authenticateToken, topicController.deleteTopic);

export default router;
