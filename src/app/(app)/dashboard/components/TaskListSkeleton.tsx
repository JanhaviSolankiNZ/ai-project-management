"use client";

import { Stack, Skeleton, Box } from "@mui/material";

export default function TaskListSkeleton() {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Box key={idx} display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width="70%" height={28} />
          <Skeleton variant="rectangular" width={60} height={24} />
        </Box>
      ))}
    </Stack>
  );
}
