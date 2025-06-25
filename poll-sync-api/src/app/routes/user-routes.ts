import express from "express";

import * as user from '../controllers/user.controllers'
import { authenticateToken } from "../middlewares/auth.middleware";

const userRouter = express.Router()
userRouter.get('/list', user.getAllUsers)
userRouter.post('/create', user.createUser)
userRouter.get('/get/current', authenticateToken, user.getCurrentUser)
userRouter.get('/count/all', authenticateToken, user.countTotalUser)

export default userRouter