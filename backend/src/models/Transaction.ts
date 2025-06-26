import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  id: number;
  date: Date;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
}

const transactionSchema = new Schema<ITransaction>({
  id:         { type: Number,   required: true, unique: true },
  date:       { type: Date,     required: true },
  amount:     { type: Number,   required: true },
  category:   { type: String,   required: true },
  status:     { type: String,   required: true },
  user_id:    { type: String,   required: true },
  user_profile:{ type: String,  required: true }
});

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
