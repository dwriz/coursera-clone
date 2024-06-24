import { getDatabase } from "../config";
import { TUser } from "@/types/user.types";

export class User {
  static async create(user: TUser) {
    const client = await getDatabase();

    const collection = client.db("p3-gc02-ecommerce").collection<TUser>("users");

    const result = await collection.insertOne(user);

    return result.insertedId;
  }

  static async findByEmail(email: string) {
    const client = await getDatabase();
    const collection = client.db("p3-gc02-ecommerce").collection<TUser>("users");
    const user = await collection.findOne({ email });
    return user;
  }

  static async findByUsername(username: string) {
    const client = await getDatabase();
    const collection = client.db("p3-gc02-ecommerce").collection<TUser>("users");
    const user = await collection.findOne({ username });
    return user;
  }
}
