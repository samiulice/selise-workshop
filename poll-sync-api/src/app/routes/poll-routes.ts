import express from 'express';
import * as poll from '../controllers/poll.controllers'
import { authenticateToken } from '../middlewares/auth.middleware';

const pollRouter = express.Router();

pollRouter.use(authenticateToken)
pollRouter.get('/list', poll.getAllPolls);
pollRouter.get('/list/userid', poll.getPollByUserId);
pollRouter.post('/create', poll.createPoll);
pollRouter.post('/update/status/:pid/:isActive', poll.updatePollStatus);
pollRouter.post('/delete/:pid', poll.deletePollById);
pollRouter.post('/vote/:pid/:optionText', poll.voteOnPoll);

export default pollRouter;
