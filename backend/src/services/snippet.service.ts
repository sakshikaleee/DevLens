import prisma from '../prisma.js';

export const createSnippet = async ({ title, code, language, userId }: { title: string; code: string; language: string; userId: number }) => {
  return prisma.snippet.create({
    data: { title, code, language, userId },
  });
};

export const getAllSnippets = async (userId: number) => {
  return prisma.snippet.findMany({ where: { userId } });
};

export const getSnippetById = async (id: number, userId: number) => {
  return prisma.snippet.findFirst({ where: { id, userId } });
};

export const updateSnippet = async (id: number, data: { title?: string; code?: string; language?: string }, userId: number) => {
  const snippet = await prisma.snippet.findFirst({ where: { id, userId } });
  if (!snippet) return null;
  return prisma.snippet.update({ where: { id }, data });
};

export const deleteSnippet = async (id: number, userId: number) => {
  const snippet = await prisma.snippet.findFirst({ where: { id, userId } });
  if (!snippet) return false;
  await prisma.snippet.delete({ where: { id } });
  return true;
};
