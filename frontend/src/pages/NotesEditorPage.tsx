import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
import { Card, CardContent, CardTitle, Button, Input, Textarea } from 'shadcn/ui';

const NotesEditorPage: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [newContent, setNewContent] = useState('');
  const [editing, setEditing] = useState<{ id: number; content: string } | null>(null);

  const fetchNotes = () => getNotes().then(r => setNotes(r.data));

  useEffect(() => { fetchNotes(); }, []);

  const handleCreate = async () => {
    if (!newContent) return;
    await createNote({ content: newContent });
    setNewContent('');
    fetchNotes();
  };

  const handleUpdate = async (id: number) => {
    if (!editing) return;
    await updateNote(id, { content: editing.content });
    setEditing(null);
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <Card>
      <CardTitle>Notes</CardTitle>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="New note content" />
          <Button onClick={handleCreate}>Add</Button>
        </div>
        <ul>
          {notes.map(note => (
            <li key={note.id} className="flex items-center gap-2 mb-2">
              {editing?.id === note.id ? (
                <>
                  <Textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} />
                  <Button onClick={() => handleUpdate(note.id)}>Save</Button>
                  <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <span>{note.content}</span>
                  <Button variant="secondary" onClick={() => setEditing({ id: note.id, content: note.content })}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(note.id)}>Delete</Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NotesEditorPage;
