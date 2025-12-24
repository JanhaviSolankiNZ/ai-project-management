import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function Page() {
  return (
    <AuthCard title="Welcome back" subtitle="Login to manage your projects">
      <LoginForm />
    </AuthCard>
  );
}
