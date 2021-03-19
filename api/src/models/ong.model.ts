import { Schema, model, Document } from 'mongoose';
import { PetSchema, IPetModel } from './pet.model';

export interface IUserModel extends Document {
  username: string;
  password: string;
  name: string;
  foto: string;
  email: string;
  telefone: string;
  sobre: string;
  pets: Array<IPetModel>;
  uf: string;
  cidade: string;
  bank_information: {
    pix_key: string;
  };
}

const UserSchema = new Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  sobre: {
    type: String,
    required: true,
  },
  pets: {
    type: [PetSchema],
    default: [],
  },
  uf: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  bank_information: {
    pix_key: {
      type: String,
    },
  },
});

export default model<IUserModel>('User', UserSchema);
