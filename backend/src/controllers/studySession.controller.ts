import { Request, Response, NextFunction } from 'express';
import * as studySessionService from '../services/studySession.service';

export const startSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { topicId } = req.body;
    const session = await studySessionService.startSession(Number(userId), topicId ? Number(topicId) : undefined);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};

export const endSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { sessionId } = req.body;
    const session = await studySessionService.endSession(Number(userId), Number(sessionId));
    if (!session) return res.status(404).json({ message: 'Session not found or already ended' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

export const getSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const sessions = await studySessionService.getSessions(Number(userId));
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

export const getSessionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const session = await studySessionService.getSessionById(Number(userId), Number(id));
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

export const deleteSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const deleted = await studySessionService.deleteSession(Number(userId), Number(id));
    if (!deleted) return res.status(404).json({ message: 'Session not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
