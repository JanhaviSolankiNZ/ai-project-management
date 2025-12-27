"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, CreateTaskInput } from "@/schemas/task.schema";
import { useState } from "react";

interface Props {
  projectId: string;
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const TAGS = ["frontend", "backend", "testing", "devops"] as const;

export default function AddTaskDialog({
  projectId,
  open,
  onClose,
  onCreated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      projectId,
      status: "todo",
      priority: "medium",
    },
  });
  console.log(errors)
  const onSubmit = async (data: CreateTaskInput) => {
    try {
      setLoading(true);
      await fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      reset();
      onCreated?.();
      onClose();
    } catch (err) {
      console.error("Failed to create task", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Task</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Task Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            {...register("description")}
            fullWidth
          />

          <TextField select label="Status" {...register("status")}>
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <TextField select label="Priority" {...register("priority")}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {TAGS.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    clickable
                    color={field.value?.includes(tag) ? "primary" : "default"}
                    onClick={() => {
                      const current = field.value ?? [];
                      field.onChange(
                        current.includes(tag)
                          ? current.filter((t) => t !== tag)
                          : [...current, tag]
                      );
                    }}
                  />
                ))}
              </Stack>
            )}
          />

          <TextField
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register("deadline")}
          />
          <TextField
            label="Estimated Hours"
            type="number"
            {...register("estimatedHours", { valueAsNumber: true })}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
