"use client";

import { Stack, Skeleton } from "@mui/material";

export default function AiChatWidgetSkeleton() {
  return (
    <Stack spacing={1}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton key={idx} variant="rectangular" width="100%" height={40} />
      ))}
    </Stack>
  );
}
