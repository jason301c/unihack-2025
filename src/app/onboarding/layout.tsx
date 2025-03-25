"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract the step from the path or default to step 0
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Parse the step from query parameter
    const stepParam = searchParams.get("step");

    if (stepParam && !isNaN(parseInt(stepParam, 10))) {
      // If step param exists and is a valid number
      setCurrentStep(parseInt(stepParam, 10));
    } else if (pathname === "/onboarding") {
      // If we're on the base onboarding path with no step, set to step 0
      setCurrentStep(0);
    }
  }, [pathname, searchParams]);

  // The total number of steps in the onboarding process
  const totalSteps = 5;

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      router.push(`/onboarding?step=${nextStep}`);
    } else {
      // If we've completed all steps, redirect to a final destination
      router.push("/home");
    }
  };

  const handleBackClick = () => {
    if (currentStep === 0) {
      // If at the first step, go back to homepage
      router.push("/");
    } else {
      // Otherwise go to the previous step
      router.push(`/onboarding?step=${currentStep - 1}`);
    }
  };

  // For the 4th page, we just return the children
  if (currentStep === 4) {
    return <div className="flex-grow">{children}</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Back button */}
      <div className="p-4 pt-4">
        <button onClick={handleBackClick} className="text-prim-darkest">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
      </div>

      <div className="flex-grow">{children}</div>

      {/* Pagination */}
      <div className="p-4 pb-4 flex justify-between items-center sticky bottom-0 left-0 right-0 bg-white">
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all ${
                currentStep === index
                  ? "w-6 h-3 bg-prim-darkest" // Current step - wider indicator
                  : "w-3 h-3 bg-gray-500" // Other steps - standard circular indicator
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={goToNextStep}
          className="bg-prim-darkest text-white px-6 py-2 rounded-full font-medium"
        >
          {currentStep === totalSteps - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
