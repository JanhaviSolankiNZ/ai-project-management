import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";
export default function Page() {
  return (
    <AuthCard
      title="Create an account"
      subtitle="Start managing your work smarter"
    >
      <SignupForm/>
    </AuthCard>
  );
}
