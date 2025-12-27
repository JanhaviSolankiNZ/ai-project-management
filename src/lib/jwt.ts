import jwt from "jsonwebtoken";
import { AuthJwtPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET!;
export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): AuthJwtPayload | null => {
   try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthJwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
