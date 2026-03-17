import { Request, Response, NextFunction } from 'express';
import * as progressService from '../services/progress.service';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const stats = await progressService.getDashboardStats(userId);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

export const getWeeklyStudyHours = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const data = await progressService.getWeeklyStudyHours(userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getLearningAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const analytics = await progressService.getLearningAnalytics(userId);
    res.json(analytics);
  } catch (err) {
    next(err);
  }
};
