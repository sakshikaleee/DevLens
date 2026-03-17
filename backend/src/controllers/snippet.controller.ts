import { Request, Response, NextFunction } from 'express';
import * as snippetService from '../services/snippet.service';

export const createSnippet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, code, language } = req.body;
    const userId = (req as any).user.userId;
    const snippet = await snippetService.createSnippet({ title, code, language, userId: Number(userId) });
    res.status(201).json(snippet);
  } catch (err) {
    next(err);
  }
};

export const getAllSnippets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const snippets = await snippetService.getAllSnippets(Number(userId));
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};

export const getSnippetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const snippet = await snippetService.getSnippetById(Number(id), Number(userId));
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (err) {
    next(err);
  }
};

export const updateSnippet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, code, language } = req.body;
    const userId = (req as any).user.userId;
    const snippet = await snippetService.updateSnippet(Number(id), { title, code, language }, Number(userId));
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (err) {
    next(err);
  }
};

export const deleteSnippet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const deleted = await snippetService.deleteSnippet(Number(id), Number(userId));
    if (!deleted) return res.status(404).json({ message: 'Snippet not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
