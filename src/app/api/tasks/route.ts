import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { Task } from "@/models/Task";

export async function GET() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // 1️⃣ Get user's projects
  const projects = await Project.find({
    ownerId: authUser.userId,
  }).select("_id");

  if (projects.length === 0) {
    return NextResponse.json([]);
  }

  const projectIds = projects.map((p) => p._id);

  // 2️⃣ Calculate today's date range
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // 3️⃣ Fetch today's tasks
  const tasks = await Task.find({
    projectId: { $in: projectIds },
    deadline: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).select("title status priority deadline");
  console.log("##",await Task.find({
    projectId: { $in: projectIds }}));
  return NextResponse.json(tasks);
}
