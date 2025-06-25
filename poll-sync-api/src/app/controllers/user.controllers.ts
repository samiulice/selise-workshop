import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { password, email, ...rest } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: true, message: "Email already exists" });
      return;
    }

    if (!password) {
      res.status(400).json({ error: true, message: "Password is required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ ...rest, email, password: hashedPassword });
    const savedUser = await user.save();
    res.status(201).json({ error: false, message: "registration successful" });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: true, message: err.message });
      return;
    }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Duplicate key error for email
      res.status(409).json({ error: true, message: "Email already exists" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await UserModel.find();
  res.json(users);
};
export const getCurrentUser = async (req: Request, res: Response) => {
  const uid: string = (req as any).userId;
  console.log(uid);
  const user = await UserModel.findById(uid);
  if (!user) {
    res.status(404).json({ error: true, message: "User not found" });
  }
  console.log(user);
  res.status(200).json({ error: false, message: "User fetched", user });
};
export const countTotalUser = async (_req: Request, res: Response) => {
  try {
    const count = await UserModel.countDocuments();
    res
      .status(200)
      .json({ error: false, message: "success", totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
// export const updateUser = async (req: Request, res: Response) => {
//   const updatedUser = await UserModel.findByIdAndUpdate(
//     req.params.id,
//     { ...req.body, updatedAt: new Date() },
//     { new: true }
//   );
//   if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//   res.json(updatedUser);
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
//   if (!deletedUser) return res.status(404).json({ message: 'User not found' });
//   res.json({ message: 'User deleted' });
// };
