import { Schema, model, Document } from 'mongoose';

export interface IAuthModel extends Document {
  username: string;
  password: string;
  role: number;
  user: string;
}

const AuthSchema = new Schema<IAuthModel>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: { type: String, required: false },
  role: { type: Number, required: true },
});

export default model<IAuthModel>('Auth', AuthSchema);
