import prisma from '../prisma.js';

export const getDashboardStats = async (userId: number) => {
  const [topics, notes, studySessions] = await Promise.all([
    prisma.topic.count({ where: { userId } }),
    prisma.note.count({ where: { userId } }),
    prisma.studySession.count({ where: { userId } })
  ]);
  return { topics, notes, studySessions };
};

export const getWeeklyStudyHours = async (userId: number) => {
  // Get study sessions for the last 7 days
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 6);
  const sessions = await prisma.studySession.findMany({
    where: {
      userId,
      startedAt: { gte: weekAgo }
    }
  });
  // Group by day and sum hours
  const daily: { [date: string]: number } = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekAgo);
    d.setDate(weekAgo.getDate() + i);
    daily[d.toISOString().slice(0, 10)] = 0;
  }
  sessions.forEach((s) => {
    const start = s.startedAt;
    const end = s.endedAt || now;
    const day = start.toISOString().slice(0, 10);
    const hours = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
    if (daily[day] !== undefined) daily[day] += hours;
  });
  return daily;
};

export const getLearningAnalytics = async (userId: number) => {
  // Example: topics completed, notes per topic, total study time
  const topics = await prisma.topic.findMany({ where: { userId }, include: { notes: true } });
  const completedSessions = await prisma.studySession.findMany({
    where: { userId, endedAt: { not: null } }
  });
  const totalStudyTimeHours = completedSessions.reduce((acc, curr) => {
    if (curr.endedAt) {
      return acc + (curr.endedAt.getTime() - curr.startedAt.getTime()) / 1000 / 60 / 60;
    }
    return acc;
  }, 0);

  return {
    topics: topics.map((t: { id: number; title: string; notes: any[] }) => ({ id: t.id, title: t.title, notes: t.notes.length })),
    totalStudyTimeHours
  };
};
