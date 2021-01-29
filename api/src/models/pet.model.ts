import { Schema, model, Document } from 'mongoose';

export interface IPetModel extends Document {
  name: string;
  foto: string;
  porte: string;
  sobre: string;
  idade: number;
  foiAdotado: boolean;
  institution: string;
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
  institution: {
    type: String,
    required: true,
  },
});

export default model<IPetModel>('Pet', PetSchema);
