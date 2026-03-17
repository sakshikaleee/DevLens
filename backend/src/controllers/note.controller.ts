import { Request, Response, NextFunction } from 'express';
import * as noteService from '../services/note.service';

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, topicId } = req.body;
    const userId = (req as any).user.userId;
    const note = await noteService.createNote({ content, topicId: Number(topicId), userId: Number(userId) });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const notes = await noteService.getAllNotes(Number(userId));
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const note = await noteService.getNoteById(Number(id), Number(userId));
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = (req as any).user.userId;
    const note = await noteService.updateNote(Number(id), { content }, Number(userId));
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const deleted = await noteService.deleteNote(Number(id), Number(userId));
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
