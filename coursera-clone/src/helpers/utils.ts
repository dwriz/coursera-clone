import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function comparePassword(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

export type JwtPayload = {
  _id: string;
  email: string;
  name: string;
  username: string;
  iat?: number;
  exp?: number;
};

export async function signToken(data: JwtPayload): Promise<string> {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );

  return payload as JwtPayload;
}
