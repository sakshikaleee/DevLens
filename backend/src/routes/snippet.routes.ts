import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import * as snippetController from '../controllers/snippet.controller';

const router = Router();

// All snippet routes require authentication
router.post('/', authenticateToken, snippetController.createSnippet);
router.get('/', authenticateToken, snippetController.getAllSnippets);
router.get('/:id', authenticateToken, snippetController.getSnippetById);
router.put('/:id', authenticateToken, snippetController.updateSnippet);
router.delete('/:id', authenticateToken, snippetController.deleteSnippet);

export default router;
