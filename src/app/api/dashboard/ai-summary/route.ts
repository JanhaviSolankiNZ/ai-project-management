import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { Task } from "@/models/Task";
import { getAuthUser } from "@/lib/auth";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateText } from "@/lib/ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  try {
    await connectDB();

    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1️⃣ Fetch projects
    const projects = await Project.find({ ownerId: user.userId }).lean();

    // STATE 1: No projects
    if (projects.length === 0) {
      return NextResponse.json({
        completedTasks: 0,
        pendingTasks: 0,
        nextSteps: ["Create your first project to get started"],
      });
    }

    // 2️⃣ Fetch tasks
    const tasks = await Task.find({
      projectId: { $in: projects.map((p) => p._id) },
    }).lean();
    if (tasks.length === 0) {
      return NextResponse.json({
        completedTasks: 0,
        pendingTasks: 0,
        nextSteps: [
          "Add tasks to your project",
          "Use AI to break down high-level goals",
          "Set priorities and estimates",
        ],
      });
    }

    const completedTasks = tasks.filter(
      (t) => t.status === "done"
    ).length;

    const pendingTasks = tasks.filter(
      (t) => t.status !== "done"
    ).length;

    // STATE 3: Tasks exist, none completed
    if (completedTasks === 0) {
      return NextResponse.json({
        completedTasks: 0,
        pendingTasks,
        nextSteps: [
          "Start with high-priority tasks",
          "Break tasks into smaller subtasks",
          "Focus on one task at a time",
        ],
      });
    }

    // 3️⃣ AI Prompt (STRICT JSON RESPONSE)
    const prompt = `
You are an AI productivity assistant.

Based on this data:
- Completed tasks: ${completedTasks}
- Pending tasks: ${pendingTasks}

Generate exactly 3 short actionable next steps.
Respond ONLY in valid JSON format:

{
  "nextSteps": ["step 1", "step 2", "step 3"]
}
`;

    const text = await generateText(prompt);

    // 4️⃣ Safe JSON parsing
    let nextSteps: string[] = [];

    try {
      const parsed = JSON.parse(text);
      nextSteps = parsed.nextSteps || [];
    } catch {
      nextSteps = [
        "Review pending tasks",
        "Prioritize high-impact work",
        "Set clear deadlines for today",
      ];
    }

    // 5️⃣ Final response (UI-ready)
    return NextResponse.json({
      completedTasks,
      pendingTasks,
      nextSteps,
    });
  } catch (error) {
    console.error("AI Summary Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI summary" },
      { status: 500 }
    );
  }
}
