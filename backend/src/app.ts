
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import topicRoutes from './routes/topic.routes';
import noteRoutes from './routes/note.routes';
import snippetRoutes from './routes/snippet.routes';
import studySessionRoutes from './routes/studySession.routes';
import progressRoutes from './routes/progress.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// API routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/study-sessions', studySessionRoutes);
app.use('/api/progress', progressRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use(errorHandler);

export default app;
