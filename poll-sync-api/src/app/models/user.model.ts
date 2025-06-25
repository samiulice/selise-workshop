import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

interface IUserDocument extends IUser, Document {}

const VotedPollSchema = new Schema({
  pollID: { type: String, required: true },
  optionIndex: { type: Number, required: true },
});

const UserSchema = new Schema<IUserDocument>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  votedPolls: [VotedPollSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
