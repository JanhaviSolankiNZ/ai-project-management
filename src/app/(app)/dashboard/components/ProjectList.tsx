"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Chip, Skeleton, Button } from "@mui/material";
import ProjectTaskList from "./ProjectTaskList";

interface Project {
  _id: string;
  name: string;
  description?: string;
  status: "planned" | "in-progress" | "completed";
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Grid key={idx} size={{xs:12, md:6}}>
            <Skeleton variant="rounded" height={120} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (projects.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No projects found. Create one to get started.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid key={project._id} size={{xs:12, md:6}}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.name}
                </Typography>
                {project.description && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {project.description}
                  </Typography>
                )}
                <Chip
                  label={project.status.replace("-", " ")}
                  color={
                    project.status === "completed"
                      ? "success"
                      : project.status === "in-progress"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => setSelectedProjectId(project._id)}
                >
                  View Tasks
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProjectId && (
        <ProjectTaskList
          projectId={selectedProjectId}
          open={!!selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </>
  );
}
