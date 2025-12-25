'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import { LogoutButton } from '../auth/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        color: 'text.primary',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Page Title */}
        <Typography variant="h6" fontWeight={600}>
          Dashboard
        </Typography>

        {/* Right Actions */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <LogoutButton/>
          <Avatar sx={{ width: 32, height: 32 }}>
            J
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
