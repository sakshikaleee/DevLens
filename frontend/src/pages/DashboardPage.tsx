import React, { useEffect, useState } from 'react';
import { getDashboardStats, getWeeklyStudy, getAnalytics } from '../services/api';
import { Card, CardContent, CardTitle } from 'shadcn/ui';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>({});
  const [weekly, setWeekly] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({});

  useEffect(() => {
    getDashboardStats().then(r => setStats(r.data));
    getWeeklyStudy().then(r => {
      const arr = Object.entries(r.data).map(([date, hours]) => ({ date, hours }));
      setWeekly(arr);
    });
    getAnalytics().then(r => setAnalytics(r.data));
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardTitle>Total Topics</CardTitle>
        <CardContent>{stats.topics}</CardContent>
      </Card>
      <Card>
        <CardTitle>Notes Count</CardTitle>
        <CardContent>{stats.notes}</CardContent>
      </Card>
      <Card>
        <CardTitle>Study Sessions</CardTitle>
        <CardContent>{stats.studySessions}</CardContent>
      </Card>
      <Card className="col-span-2">
        <CardTitle>Weekly Study Hours</CardTitle>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekly}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardTitle>Analytics</CardTitle>
        <CardContent>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(analytics, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
