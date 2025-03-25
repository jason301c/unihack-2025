import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <button 
      className="text-prim-darkest" 
      onClick={() => router.push("/home")}
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
