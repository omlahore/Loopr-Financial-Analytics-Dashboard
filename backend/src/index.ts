import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import transactionsRouter from './routes/transactions';
import authRouter from './routes/auth';

dotenv.config();
const app = express();
const { PORT = 4000, MONGODB_URI } = process.env;

// Check for required environment variables
if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

// CORS configuration
const corsOptions = {
  origin: [
    'https://loopr-financial-analytics-dashboard.onrender.com', // Production domain
    'http://localhost:3000', // React dev server (for local development)
    'http://localhost:3001', // Alternative React port
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.send('🚀 Backend is live');
});

// Auth API
app.use('/auth', authRouter);

// Transactions API
app.use('/transactions', transactionsRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Connected to MongoDB`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
