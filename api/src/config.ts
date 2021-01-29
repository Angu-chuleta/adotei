import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const {
  MONGODB_USER: dbUser,
  MONGODB_PASS: dbPass,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PORT: _PORT,
  NODE_ENV,
  JWT,
} = process.env;

const isTesting = NODE_ENV === 'test';
const dbName = isTesting ? 'test' : 'adoteitest';
const dbUrl = process.env.MONGODB_URL || 'cluster0.lkvk4.mongodb.net';

const connectDb = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@${dbUrl}/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  );
};

const PORT = isTesting ? parseInt(`${Math.random() * 10}999`, 10) : _PORT;

const authConfig = {
  jwtSecret: JWT || 's3cr370',
};

export {
  connectDb,
  PORT,
  NODE_ENV,
  authConfig,
};
