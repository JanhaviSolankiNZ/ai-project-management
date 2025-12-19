import { redirect } from 'next/navigation';

export default function HomePage() {
  // Temporary auth flag
  // Later replace with real server auth (cookies / session)
  const isAuthenticated = false;

  if (isAuthenticated) {
    redirect('/dashboard');
  }

  redirect('/login');
}
