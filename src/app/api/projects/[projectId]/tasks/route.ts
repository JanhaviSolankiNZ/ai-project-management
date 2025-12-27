import { NextResponse } from "next/server";
import { Task } from "@/models/Task";
import { Project } from "@/models/Project";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { createTaskSchema } from "@/schemas/task.schema";

// GET /api/projects/:projectId/tasks → fetch tasks for a project
export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;

  try {
    const tasks = await Task.find({ projectId });
    console.log(projectId, tasks)
    return NextResponse.json(tasks);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = createTaskSchema.parse(body);

    await connectDB();

    // Ensure project exists
    const project = await Project.findById(data.projectId);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    console.log('##data',data)
    const task = await Task.create({
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      status: data.status ?? "todo",
      priority: data.priority ?? "medium",
      tags: data.tags,
      estimatedHours: data.estimatedHours,
      isAIGenerated: data.isAIGenerated ?? false,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create task" },
      { status: 400 }
    );
  }
}