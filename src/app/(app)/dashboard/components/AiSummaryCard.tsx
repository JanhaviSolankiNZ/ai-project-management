"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import AiSummarySkeleton from "./AiSummaryCardSkeleton";

interface AiSummary {
  completedTasks: number;
  pendingTasks: number;
  nextSteps: string[];
}

export default function AiSummaryCard() {
  const [summary, setSummary] = useState<AiSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/dashboard/ai-summary");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch AI summary", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading || !summary) return <AiSummarySkeleton />;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Daily Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            ✅ Completed Tasks: {summary.completedTasks}
          </Typography>
          <Typography variant="body2">
            ⏳ Pending Tasks: {summary.pendingTasks}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
            Suggested Next Steps:
          </Typography>
          <Stack component="ul" sx={{ pl: 3, mt: 0.5 }}>
            {summary.nextSteps.map((step, idx) => (
              <Typography key={idx} component="li" variant="body2">
                {step}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
