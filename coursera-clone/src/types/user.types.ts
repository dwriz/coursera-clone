import { ObjectId } from "mongodb";

export type TUser = {
  id?: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
