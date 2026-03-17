import React, { useEffect, useState } from 'react';
import { getWeeklyStudy, startSession, endSession, getSessions } from '../services/api';
import { Card, CardContent, CardTitle, Button, Input } from 'shadcn/ui';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StudyAnalyticsDashboard: React.FC = () => {
  const [weekly, setWeekly] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [topicId, setTopicId] = useState('');
  const [activeSession, setActiveSession] = useState<any>(null);

  useEffect(() => {
    getWeeklyStudy().then(r => {
      const arr = Object.entries(r.data).map(([date, hours]) => ({ date, hours }));
      setWeekly(arr);
    });
    getSessions().then(r => setSessions(r.data));
  }, []);

  const handleStart = async () => {
    const res = await startSession({ topicId: topicId ? Number(topicId) : undefined });
    setActiveSession(res.data);
  };

  const handleEnd = async () => {
    if (!activeSession) return;
    await endSession({ sessionId: activeSession.id });
    setActiveSession(null);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardTitle>Weekly Study Hours</CardTitle>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekly}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardTitle>Study Sessions</CardTitle>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input value={topicId} onChange={e => setTopicId(e.target.value)} placeholder="Topic ID (optional)" />
            <Button onClick={handleStart} disabled={!!activeSession}>Start Session</Button>
            <Button onClick={handleEnd} disabled={!activeSession}>End Session</Button>
          </div>
          <ul>
            {sessions.map(s => (
              <li key={s.id}>
                {s.topicId ? `Topic #${s.topicId}` : 'No topic'} | Start: {new Date(s.startedAt).toLocaleString()} | End: {s.endedAt ? new Date(s.endedAt).toLocaleString() : 'Active'}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAnalyticsDashboard;
