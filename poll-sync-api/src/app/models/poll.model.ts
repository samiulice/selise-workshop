// models/Poll.ts
import mongoose, { Schema, Document } from 'mongoose';

const OptionSchema = new Schema({
  optionText: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
});

const VoteSchema = new Schema({
  userId: String,
  optionText: String,
});

const PollSchema = new Schema({
  question: { type: String, required: true },
  options: [OptionSchema],
  votes: [VoteSchema],
  isActive: { type: Boolean, default: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PollModel = mongoose.model('Poll', PollSchema);
