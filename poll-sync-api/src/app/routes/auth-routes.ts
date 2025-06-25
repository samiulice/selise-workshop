import express from "express";
import * as auth from "../controllers/auth.controllers";

const authRoutes = express.Router()

authRoutes.post('/login', auth.authUser)
// authRoutes.post('/logout', auth.authUser)
export default authRoutes