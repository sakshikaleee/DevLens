import React, { useEffect, useState } from 'react';
import { getTopics, createTopic, updateTopic, deleteTopic } from '../services/api';
import { Card, CardContent, CardTitle, Button, Input } from 'shadcn/ui';

const TopicManagementPage: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [editing, setEditing] = useState<{ id: number; title: string } | null>(null);

  const fetchTopics = () => getTopics().then(r => setTopics(r.data));

  useEffect(() => { fetchTopics(); }, []);

  const handleCreate = async () => {
    if (!newTitle) return;
    await createTopic({ title: newTitle });
    setNewTitle('');
    fetchTopics();
  };

  const handleUpdate = async (id: number) => {
    if (!editing) return;
    await updateTopic(id, { title: editing.title });
    setEditing(null);
    fetchTopics();
  };

  const handleDelete = async (id: number) => {
    await deleteTopic(id);
    fetchTopics();
  };

  return (
    <Card>
      <CardTitle>Topics</CardTitle>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New topic title" />
          <Button onClick={handleCreate}>Add</Button>
        </div>
        <ul>
          {topics.map(topic => (
            <li key={topic.id} className="flex items-center gap-2 mb-2">
              {editing?.id === topic.id ? (
                <>
                  <Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
                  <Button onClick={() => handleUpdate(topic.id)}>Save</Button>
                  <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <span>{topic.title}</span>
                  <Button variant="secondary" onClick={() => setEditing({ id: topic.id, title: topic.title })}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(topic.id)}>Delete</Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopicManagementPage;
