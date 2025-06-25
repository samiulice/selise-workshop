export interface IUser {
  fullName: string;
  email: string;
  password: string;
  votedPolls: IVotedPoll[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IVotedPoll {
  pollID: string;
  optionIndex: number;
}
export interface IUserWithId extends IUser {
  _id: string;
}
