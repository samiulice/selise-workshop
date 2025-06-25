export interface IPollOption {
  optionText: string;
  voteCount: number; // optional, will default to 0
  percentage?:number
}

export interface IVote {
  userId: string;
  optionIndex: number;
  votedAt: Date; // optional, will default to now
}

export interface IPoll {
  question: string;
  options: IPollOption[];
  votes: IVote[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPollWithID extends IPoll {
  _id: string;
}
