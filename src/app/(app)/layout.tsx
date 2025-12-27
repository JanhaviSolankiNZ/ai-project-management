import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Box } from '@mui/material';
import { EmotionCacheProvider } from '@/lib/emotion-cache-provider';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmotionCacheProvider>
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
    </EmotionCacheProvider>
  );
}
