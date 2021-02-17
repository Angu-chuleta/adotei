import { Schema, model, Document } from 'mongoose';

export interface IUserModel extends Document {
  name: string;
  foto: string;
  email: string;
  telefone: string;
  sobre: string;
  credito: number;
}

const UserSchema = new Schema<IUserModel>({
  name: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  sobre: {
    type: String,
    required: true,
  },
  credito: {
    type: Number,
    required: true,
  },
});

export default model<IUserModel>('User', UserSchema);
