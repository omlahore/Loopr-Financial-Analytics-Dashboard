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

app.use(cors());
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
