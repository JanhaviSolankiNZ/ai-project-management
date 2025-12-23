export type UserRole = "admin" | "user";
export type AuthProvider = "credentials" | "google";

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  authProvider: AuthProvider;
  createdAt: string;
  updatedAt: string;
}
