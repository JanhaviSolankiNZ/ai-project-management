"use client";

import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function AiSummarySkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width="50%" height={28} sx={{ mb: 1 }} />
        <Stack spacing={1}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} variant="text" width="90%" height={20} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
