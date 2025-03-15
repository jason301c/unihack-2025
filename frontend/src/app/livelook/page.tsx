"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import SelectClothes from '@/components/livelook/SelectClothes';
import UploadPhoto from '@/components/livelook/UploadPhoto';
import Generated from '@/components/livelook/Generated';

export default function LiveLook() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step') || '0');

  // Handle navigation between steps
  const goToStep = (newStep: number) => {
    router.push(`/livelook?step=${newStep}`);
  };

  const goBack = () => {
    if (step > 0) {
      goToStep(step - 1);
    } else {
      router.push('/'); // Go to home if at first step
    }
  };

  const goToHome = () => {
    router.push('/');
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
      case 1:
        return <UploadPhoto onBack={goBack} onNext={() => goToStep(2)} />;
      case 2:
        return <Generated onBack={goBack} onFinish={goToHome} />;
      default:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
    }
  };

  return renderStep();
}
