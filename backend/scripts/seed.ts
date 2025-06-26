import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Transaction } from '../src/models/Transaction';
import { User } from '../src/models/User';
import transactionsData from '../transactions.json';

// Load .env
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Transaction.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Seed transactions
    await Transaction.insertMany(transactionsData);
    console.log(`Seeded ${transactionsData.length} transactions`);

    // Create default user
    const defaultUser = new User({
      email: 'admin@example.com',
      password: 'password123',
      name: 'Admin User',
      role: 'admin'
    });

    await defaultUser.save();
    console.log('Created default user: admin@example.com / password123');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
