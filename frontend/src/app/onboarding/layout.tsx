"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract the step from the path or default to step 0
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    // Parse the current step from the URL path if it exists
    const stepMatch = pathname.match(/\/onboarding\/(\d+)/);
    if (stepMatch && stepMatch[1]) {
      setCurrentStep(parseInt(stepMatch[1], 10));
    } else if (pathname === "/onboarding") {
      // If we're on the base onboarding path, set to step 0
      setCurrentStep(0);
    }
  }, [pathname]);

  // The total number of steps in the onboarding process
  const totalSteps = 4;
  
  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      router.push(`/onboarding/${nextStep}`);
    } else {
      // If we've completed all steps, redirect to a final destination
      router.push("/wardrobe");
    }
  };

  const handleBackClick = () => {
    if (currentStep === 0) {
      // If at the first step, go back to homepage
      router.push('/');
    } else {
      // Otherwise go to the previous step
      router.push(`/onboarding/${currentStep - 1}`);
    }
  };

  return (
    <html lang="en">
      <body>
        {/* Back button */}
        <div className="p-4">
          <button onClick={handleBackClick} className="text-prim-darkest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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

        {children}

        {/* Pagination */}
        <div className="mt-auto p-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`rounded-full transition-all ${
                  currentStep === index 
                    ? "w-6 h-3 bg-prim-darkest" // Current step - wider indicator
                    : "w-3 h-3 bg-gray-500"     // Other steps - standard circular indicator
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
      </body>
    </html>
  );
}
