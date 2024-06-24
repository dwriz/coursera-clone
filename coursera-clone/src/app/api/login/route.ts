import { NextResponse } from "next/server";
import { z } from "zod";
import { comparePassword, signToken } from "@/helpers/utils";
import { User } from "@/db/models/user.model";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = loginSchema.parse(body);

    const user = await User.findByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const passwordMatch = comparePassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const token = await signToken({
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      username: user.username,
    });

    const cookiesStore = cookies();

    cookiesStore.set("Authorization", `Bearer ${token}`, {
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
}
