import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    authProvider: "credentials",
  });

  const token = signToken({ userId: user._id });

  const res = NextResponse.json({
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return res;
}
