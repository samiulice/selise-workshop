import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

export const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    //invalid user
    if (!user) {
      res.status(400).json({ error: true, message: "Invalid credentials" });
    } else {
      //check password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {        
        const token = jwt.sign({userId:user._id, email:user.email}, config.jwtSecret,{expiresIn:"10d"})
        res.status(200).json({ error: false, message: "Logged in", token });      
      } else {
        res.status(400).json({ error: true, message: "Invalid credentials" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: "An unknown error occurred" });
  }
};
