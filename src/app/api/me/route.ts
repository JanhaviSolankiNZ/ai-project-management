import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const user = await User.findById(authUser.userId).select(
    "name email image role"
  );

  return NextResponse.json(user);
}
