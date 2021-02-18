import { Schema, model, Document } from 'mongoose';

export interface ITransactionModel extends Document {
  pet_id: string;
  value: number;
  date: string;
}

export const TransactionSchema = new Schema<ITransactionModel>({
  pet_id: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default model<ITransactionModel>('transaction', TransactionSchema);
