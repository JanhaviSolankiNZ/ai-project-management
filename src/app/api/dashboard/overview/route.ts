import { NextResponse } from "next/server";
import { Project } from "@/models/Project";
import { Task } from "@/models/Task";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all projects and tasks for the user
    const totalProjects = await Project.countDocuments({ ownerId: user.userId });
    const totalTasks = await Task.countDocuments({ ownerId: user.userId });
    const completedTasks = await Task.countDocuments({ ownerId: user.userId, status: "completed" });
    const pendingTasks = await Task.countDocuments({ ownerId: user.userId, status: { $in: ["pending", "in-progress"] } });

    // Tasks due today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayTasks = await Task.countDocuments({
      ownerId: user.userId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    return NextResponse.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      todayTasks,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch overview" }, { status: 500 });
  }
}
