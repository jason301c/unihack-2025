"use client";
import React from 'react';
import WelcomeStep from '@/components/onboarding/steps/WelcomeStep';
import ClothingTypeStep from '@/components/onboarding/steps/ClothingTypeStep';
import ChooseItemsStep from '@/components/onboarding/steps/ChooseItemsStep';
import UploadPhotoStep from '@/components/onboarding/steps/UploadPhotoStep';

interface OnboardingStepPageProps {
  params: {
    step: string;
  }
}

export default function OnboardingStepPage({ params }: OnboardingStepPageProps) {
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
      return <UploadPhotoStep />;
    default:
      // Default to the welcome step if the step number is invalid
      return <WelcomeStep />;
  }
}