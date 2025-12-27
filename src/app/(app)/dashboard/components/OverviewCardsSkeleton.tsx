"use client";

import { Grid, Card, CardContent, Skeleton } from "@mui/material";

export default function OverviewCardsSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Grid key={idx} size={{xs:12, md:2.4}}>
          <Card variant="outlined">
            <CardContent>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={32} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
