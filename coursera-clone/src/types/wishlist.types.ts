import { ObjectId } from "mongodb";

export type TWishlist = {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
