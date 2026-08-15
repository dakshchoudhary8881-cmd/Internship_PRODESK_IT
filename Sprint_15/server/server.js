import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Wrap in try/catch — Vercel has no .env file, uses dashboard env vars
try {
  dotenv.config();
} catch (e) {
  console.log('No .env file, using Vercel environment variables');
}

connectDB();

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = [
      /https:\/\/sprint-14-client.*\.vercel\.app$/,
      /https:\/\/sprint-15-client.*\.vercel\.app$/,
      /http:\/\/localhost:\d+$/,
    ];
    if (!origin || allowed.some(r => r.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => res.send('API is running...'));

export default app;