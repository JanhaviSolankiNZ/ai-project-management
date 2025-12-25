"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { loginSchema, LoginFormValues } from "@/schemas/login.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.message || "Login failed");
      return;
    }
    router.push("/");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        autoFocus
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isSubmitting}
      >
        Login
      </Button>

      <Divider sx={{ my: 3 }}>OR</Divider>

      <Button variant="outlined" fullWidth onClick={() => signIn("google", {callbackUrl: "/dashboard"})}>
        Continue with Google
      </Button>
      <Typography variant="body2" align="center" mt={3}>
        Don’t have an account?{" "}
        <MuiLink component={Link} href="/signup">
          Sign up
        </MuiLink>
      </Typography>
    </Box>
  );
}
