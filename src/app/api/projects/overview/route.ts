import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/Task";
import { Project } from "@/models/Project";

export async function GET() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const [totalProjects, totalTasks, completedTasks] = await Promise.all([
    Project.countDocuments({ ownerId: authUser.userId }),
    Task.countDocuments({ ownerId: authUser.userId }),
    Task.countDocuments({
      ownerId: authUser.userId,
      status: "completed",
    }),
  ]);

  return NextResponse.json({
    totalProjects,
    totalTasks,
    completedTasks,
  });
}
