import mongoose from 'mongoose';
import { config } from './app.config';
const mongoURI = config.mongoURI

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  }
};
