import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Box } from '@mui/material';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  );
}
