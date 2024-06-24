import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/helpers/utils";
import { User } from "@/db/models/user.model";
import { TUser } from "@/types/user.types";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, username, email, password } = userSchema.parse(body);

    const existingUserByEmail = await User.findByEmail(email);

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    const existingUserByUsername = await User.findByUsername(username);

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Username is already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    const newUser: TUser = {
      name,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userId = await User.create(newUser);

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}
