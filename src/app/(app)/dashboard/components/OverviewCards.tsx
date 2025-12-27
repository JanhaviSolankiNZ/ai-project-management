"use client";

import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import OverviewCardsSkeleton from "./OverviewCardsSkeleton";

interface OverviewData {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  todayTasks: number;
}

export default function OverviewCards() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const res = await fetch("/api/dashboard/overview");
        const overview = await res.json();
        setData(overview);
      } catch (err) {
        console.error("Failed to fetch overview", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOverview();
  }, []);

  if (loading || !data) {
    return <OverviewCardsSkeleton />;
  }

  const cards = [
    { label: "Total Projects", value: data.totalProjects },
    { label: "Total Tasks", value: data.totalTasks },
    { label: "Completed Tasks", value: data.completedTasks },
    { label: "Pending Tasks", value: data.pendingTasks },
    { label: "Today's Tasks", value: data.todayTasks },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, idx) => (
        <Grid key={idx} size={{xs:12, md:2.4}}> {/* 5 cards in a row */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h5">{card.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
