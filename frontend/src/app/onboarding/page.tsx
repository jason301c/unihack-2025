"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to step 0 when accessing the base onboarding page
    router.replace('/onboarding/0');
  }, [router]);

  // Return null as this component will immediately redirect
  return null;
}