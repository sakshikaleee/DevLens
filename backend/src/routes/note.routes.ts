import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import * as noteController from '../controllers/note.controller';

const router = Router();

// All note routes require authentication
router.post('/', authenticateToken, noteController.createNote);
router.get('/', authenticateToken, noteController.getAllNotes);
router.get('/:id', authenticateToken, noteController.getNoteById);
router.put('/:id', authenticateToken, noteController.updateNote);
router.delete('/:id', authenticateToken, noteController.deleteNote);

export default router;
