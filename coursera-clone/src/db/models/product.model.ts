import { getDatabase } from "../config";
import { TProduct } from "@/types/product.types";
import { ObjectId } from "mongodb";

export class Product {
  static async findAll(
    search: string = "",
    page: number = 1,
    limit: number = 6
  ) {
    const client = await getDatabase();

    const collection = client
      .db("p3-gc02-ecommerce")
      .collection<TProduct>("products");

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const products = await collection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return products;
  }

  static async findById(productId: string) {
    const client = await getDatabase();

    const collection = client
      .db("p3-gc02-ecommerce")
      .collection<TProduct>("products");

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    return product;
  }

  static async findBySlug(slug: string) {
    const client = await getDatabase();

    const collection = client
      .db("p3-gc02-ecommerce")
      .collection<TProduct>("products");

    const product = await collection.findOne({ slug });

    return product;
  }
}
