import { Topic } from '@prisma/client';
import prisma from '../prisma.js';

export const createTopic = async (data: { title: string; userId: number }): Promise<Topic> => {
  return prisma.topic.create({
    data,
  });
};

export const getAllTopics = async (): Promise<Topic[]> => {
  return prisma.topic.findMany();
};

export const getTopicById = async (id: number): Promise<Topic | null> => {
  return prisma.topic.findUnique({ where: { id } });
};

export const updateTopic = async (id: number, data: { title?: string }): Promise<Topic | null> => {
  return prisma.topic.update({
    where: { id },
    data,
  });
};

export const deleteTopic = async (id: number): Promise<boolean> => {
  const topic = await prisma.topic.findUnique({ where: { id } });
  if (!topic) return false;
  await prisma.topic.delete({ where: { id } });
  return true;
};
