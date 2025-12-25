'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/lib/theme';
import EmotionCacheProvider from "@/lib/emotion-cache";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EmotionCacheProvider>
          {children}
          </EmotionCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
