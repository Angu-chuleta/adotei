import { Schema, model, Document } from 'mongoose';

export interface IPetModel extends Document {
  name: string;
  especie: string;
  foto: string;
  porte: string;
  sobre: string;
  idade: number;
  foiAdotado: boolean;
  userId: string;
  user: any;
}

export const PetSchema = new Schema<IPetModel>({
  name: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  sobre: {
    type: String,
    required: true,
  },
  porte: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  foiAdotado: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  especie: {
    type: String,
    required: false,
  },
  user: {
    type: Object,
    required: false,
  },
});

export default model<IPetModel>('Pet', PetSchema);
