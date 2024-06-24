import { getDatabase } from "../config";
import { TWishlist } from "@/types/wishlist.types";
import { ObjectId } from "mongodb";

export class Wishlist {
  static async create(wishlistItem: TWishlist) {
    const client = await getDatabase();

    const collection = client
      .db("p3-gc02-ecommerce")
      .collection<TWishlist>("wishlist");

    const result = await collection.insertOne(wishlistItem);

    return result.insertedId;
  }

  static async findByUserId(userId: string) {
    const client = await getDatabase();

    const collection = client
      .db("p3-gc02-ecommerce")
      .collection<TWishlist>("wishlist");

    const wishlistItems = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    return JSON.parse(JSON.stringify(wishlistItems));
  }

  static async delete(id: ObjectId) {
    const client = await getDatabase();

    const collection = client
      .db("p3-gc02-ecommerce")
      .collection<TWishlist>("wishlist");

    const result = await collection.deleteOne({ _id: id });

    return result.deletedCount > 0;
  }
}
