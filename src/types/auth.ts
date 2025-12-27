import { JwtPayload } from "jsonwebtoken";

export interface AuthJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}
export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
}
