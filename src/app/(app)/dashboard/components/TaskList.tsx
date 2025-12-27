"use client";

import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Grid } from "@mui/material";
import TaskListSkeleton from "./TaskListSkeleton";

interface Task {
  _id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  projectName?: string;
  estimate?: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data || []);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <TaskListSkeleton />;

  if (tasks.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No tasks for today.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <Card key={task._id} variant="outlined">
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid size={{xs:8}}>
                <Typography variant="subtitle1">{task.title}</Typography>
                {task.projectName && (
                  <Typography variant="body2" color="text.secondary">
                    Project: {task.projectName}
                  </Typography>
                )}
              </Grid>
              <Grid size={{xs:4}} display="flex" justifyContent="flex-end">
                <Chip
                  label={task.status.replace("-", " ")}
                  color={
                    task.status === "completed"
                      ? "success"
                      : task.status === "in-progress"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
