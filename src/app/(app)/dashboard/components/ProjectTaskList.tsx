"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import AddTaskDialog from "./AddTaskDialog";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "blocked" | "done";
  priority: "low" | "medium" | "high";
}

interface Props {
  projectId: string;
  open: boolean;
  onClose: () => void;
}

export default function ProjectTaskList({ projectId, open, onClose }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks`);
      const data = await res.json();
      console.log(data)
      setTasks(data || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchTasks();
  }, [open]);

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return "success";
      case "in-progress":
        return "info";
      case "blocked":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Project Tasks</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mb={2}>
            <Button variant="contained" onClick={() => setAddOpen(true)}>
              Add Task
            </Button>
          </Stack>

          {/* Loading */}
          {loading && (
            <Stack spacing={1}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} height={48} />
              ))}
            </Stack>
          )}

          {/* Empty */}
          {!loading && tasks.length === 0 && (
            <Typography color="text.secondary">
              No tasks yet. Add your first task.
            </Typography>
          )}

          {/* Task List */}
          {!loading && tasks.length > 0 && (
            <List>
              {tasks.map((task) => (
                <ListItem key={task._id} divider>
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                  />
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <AddTaskDialog
        projectId={projectId}
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={fetchTasks}
      />
    </>
  );
}
