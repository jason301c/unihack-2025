import React from "react";
import { Logo } from "@/components/base-screen/Logo";
import  { AuthForm } from "@/components/base-screen/AuthForm";

export const AuthPage: React.FC = () => {
  return (
    <main className="flex flex-col bg-neutral-50 min-h-screen">
      <div className="flex flex-col items-center w-full">
        <Logo />
        <div className="relative w-full max-w-[402px]">
          <figure>
            <div>
              <img src="frontlogo.svg"/>
            </div>
          </figure>
        </div>
        <AuthForm />
      </div>
    </main>
  );
};

export default AuthPage;
