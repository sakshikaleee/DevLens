import prisma from '../prisma.js';

export const startSession = async (userId: number, topicId?: number) => {
  return prisma.studySession.create({
    data: {
      userId,
      topicId,
      startedAt: new Date(),
    },
  });
};

export const endSession = async (userId: number, sessionId: number) => {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session || session.endedAt) return null;
  return prisma.studySession.update({
    where: { id: sessionId },
    data: { endedAt: new Date() },
  });
};

export const getSessions = async (userId: number) => {
  return prisma.studySession.findMany({ where: { userId } });
};

export const getSessionById = async (userId: number, sessionId: number) => {
  return prisma.studySession.findFirst({ where: { id: sessionId, userId } });
};

export const deleteSession = async (userId: number, sessionId: number) => {
  const session = await prisma.studySession.findFirst({ where: { id: sessionId, userId } });
  if (!session) return false;
  await prisma.studySession.delete({ where: { id: sessionId } });
  return true;
};
