export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
}
