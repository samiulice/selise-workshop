import { Request, Response } from 'express';
import { PollModel } from '../models/poll.model';

//Done
export const createPoll = async (req: Request, res: Response) => {
  const userId = (req as any).userId ;
  if (!userId) {
    res.status(400).json({ error: true, message: 'Missing userId' });
    return;
  }
  try {
    const pollData = { ...req.body, createdBy: userId };
    const poll = new PollModel(pollData);
    console.log(poll)
    const savedPoll = await poll.save();
    res.status(201).json(savedPoll);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

//Done
export const getAllPolls = async (req: Request, res: Response) => {
  let filter = {};
  if (req.query.isActive !== undefined) {
    filter = { isActive: req.query.isActive === 'true' };
  }
  const p = await PollModel.find(filter);
  res.json({error: false, message: "polls list successfully fetched", polls:p, userId:(req as any).userId});
};


export const voteOnPoll = async (req: Request, res: Response) => {
  const { pid, optionText } = req.params;
  const uid: string = (req as any).userId;

  if (!pid || !optionText) {
    res.status(400).json({ error: true, message: 'Missing pid or optionText' });
    return;
  }
  if (!uid) {
    res.status(401).json({ error: true, message: 'Unauthorized: userId missing' });
    return;
  }

  try {
    const poll = await PollModel.findById(pid);
    if (!poll) {
      res.status(404).json({ error: true, message: 'Poll not found' });
      return;
    }

    const newOptionIndex = poll.options.findIndex(opt => opt.optionText === optionText);
    if (newOptionIndex === -1) {
      res.status(400).json({ error: true, message: 'Option not found' });
      return;
    }

    // Find existing vote by this user
    const existingVoteIndex = poll.votes.findIndex(vote => vote.userId === uid);

    if (existingVoteIndex !== -1) {
      // User already voted — update vote if optionText changed
      const oldOptionText = poll.votes[existingVoteIndex].optionText;

      if (oldOptionText !== optionText) {
        // Decrement old option vote count
        const oldOptionIndex = poll.options.findIndex(opt => opt.optionText === oldOptionText);
        if (oldOptionIndex !== -1) {
          poll.options[oldOptionIndex].voteCount = Math.max(0, poll.options[oldOptionIndex].voteCount - 1);
        }

        // Increment new option vote count
        poll.options[newOptionIndex].voteCount += 1;

        // Update user's vote optionText
        poll.votes[existingVoteIndex].optionText = optionText;
      }
      // If same optionText, do nothing (already voted for this option)
    } else {
      // New vote
      poll.options[newOptionIndex].voteCount += 1;
      poll.votes.push({
        userId: uid,
        optionText,
      });
    }

    poll.updatedAt = new Date();

    await poll.save();

    res.status(200).json({ error: false, message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
export const updatePollStatus = async (req: Request, res: Response) => {
  const { pid, isActive } = req.params;
  if (!pid || typeof isActive === 'undefined') {
    res.status(400).json({ error: true, message: 'Missing pid or isActive' });
    return;
  }
  const isActiveBool = isActive === 'true';
  try {
    const updatedPoll = await PollModel.findByIdAndUpdate(
      pid,
      { isActive: isActiveBool, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedPoll) {
      res.status(404).json({ error: true, message: 'Poll not found' });
      return;
    }
    res.status(200).json({ error: false, message: 'Poll status updated' });
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};


export const deletePollById = async (req: Request, res: Response) => {
  try {
    const {pid} = req.params
    const deletedPoll = await PollModel.findByIdAndDelete(pid);
    if (!deletedPoll) {
       res.status(404).json({ error: true, message: 'Poll not found' });
       return;
    }
    res.json({ error: false, message: 'Poll deleted' });
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};

export const getPollByUserId = async (req: Request, res: Response) => {
  const userId = (req as any).userId ;
  if (!userId) {
    res.status(400).json({ error: true, message: 'Missing userId' });
    return;
  }
  try {
    const polls = await PollModel.find({ createdBy: userId });
    res.status(200).json({ error: false, message: 'Polls fetched successfully', polls });
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};