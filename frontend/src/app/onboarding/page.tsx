import React from "react";
import WelcomeStep from "@/components/onboarding/steps/WelcomeStep";
import ClothingTypeStep from "@/components/onboarding/steps/ClothingTypeStep";
import ChooseItemsStep from "@/components/onboarding/steps/ChooseItemsStep";
import UploadPhotoStep from "@/components/onboarding/steps/UploadPhotoStep";
import UploadClothesStep from "@/components/onboarding/steps/UploadClothesStep";

interface OnboardingStepPageProps {
  searchParams: {
    step: string;
  };
}

export default async function OnboardingStepPage({
  searchParams,
}: OnboardingStepPageProps) {

  // Await the search params to get the step number
  const params = await searchParams;
  const stepNumber = parseInt(params.step, 10);

  // Render the appropriate step component based on the step number
  switch (stepNumber) {
    case 0:
      return <WelcomeStep />;
    case 1:
      return <ClothingTypeStep />;
    case 2:
      return <ChooseItemsStep />;
    case 3:
      return <UploadClothesStep />;
    case 4:
      return <UploadPhotoStep />;
    default:
      // Default to the welcome step if the step number is invalid
      return <WelcomeStep />;
  }
}
