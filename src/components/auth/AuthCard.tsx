"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f7fb"
      px={2}
    >
      <Card sx={{ width: 400, maxWidth: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary" mb={3}>
              {subtitle}
            </Typography>
          )}

          {children}
        </CardContent>
      </Card>
    </Box>
  );
}
