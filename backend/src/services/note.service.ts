import prisma from '../prisma.js';

export const createNote = async ({ content, topicId, userId }: { content: string; topicId: number; userId: number }) => {
  return prisma.note.create({
    data: { content, topicId, userId },
  });
};

export const getAllNotes = async (userId: number) => {
  return prisma.note.findMany({ where: { userId } });
};

export const getNoteById = async (id: number, userId: number) => {
  return prisma.note.findFirst({ where: { id, userId } });
};

export const updateNote = async (id: number, data: { content?: string }, userId: number) => {
  const note = await prisma.note.findFirst({ where: { id, userId } });
  if (!note) return null;
  return prisma.note.update({ where: { id }, data });
};

export const deleteNote = async (id: number, userId: number) => {
  const note = await prisma.note.findFirst({ where: { id, userId } });
  if (!note) return false;
  await prisma.note.delete({ where: { id } });
  return true;
};
