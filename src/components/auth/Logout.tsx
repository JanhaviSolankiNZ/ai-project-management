"use client";

import { Button } from "@mui/material";
import { logout } from "@/lib/logout";

export function LogoutButton() {
  return (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  );
}
