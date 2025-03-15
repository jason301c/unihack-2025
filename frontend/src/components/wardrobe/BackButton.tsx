import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-black"
      onClick={
        () => console.log(router.push("/home")) // This is a placeholder for the actual function
      }
    >
      <ArrowLeft className="h-12 w-12" />
    </Button>
  );
};

export default BackButton;
