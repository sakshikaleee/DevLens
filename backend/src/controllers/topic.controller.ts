import { Request, Response, NextFunction } from 'express';
import * as topicService from '../services/topic.service';

export const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, userId } = req.body;
    const topic = await topicService.createTopic({ title, userId: Number(userId) });
    res.status(201).json(topic);
  } catch (err) {
    next(err);
  }
};

export const getAllTopics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await topicService.getAllTopics();
    res.json(topics);
  } catch (err) {
    next(err);
  }
};

export const getTopicById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const topic = await topicService.getTopicById(Number(id));
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    next(err);
  }
};

export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const topic = await topicService.updateTopic(Number(id), { title });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    next(err);
  }
};

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await topicService.deleteTopic(Number(id));
    if (!deleted) return res.status(404).json({ message: 'Topic not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
