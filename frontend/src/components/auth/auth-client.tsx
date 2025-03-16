"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PCDisclaimer from "@/components/ui/pc-disclaimer";

export default function AuthClient() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Base styles for our "button-like" divs
  const baseStyles =
    "w-full text-xl h-[54px] rounded-[300px] transition-colors duration-200 flex items-center justify-center cursor-pointer";
  const variantStyles = {
    primary: "text-black shadow bg-prim-lightest hover:bg-slate-300",
    secondary: "text-white bg-prim-darkest hover:bg-slate-700",
  };

  if (!disclaimerAccepted) {
    return (
      <PCDisclaimer onAccept={() => setDisclaimerAccepted(true)} />
    );
  }

  return (
    <main className="flex flex-col bg-neutral-50 min-h-screen">
      {/* Logo Header */}
      <header className="text-center mt-9 mb-10">
        <h1 className="text-5xl font-semibold text-prim-darkest">Weave.</h1>
      </header>

      <div className="flex flex-col items-center w-full">
        {/* Logo Image */}
        <div className="relative w-full max-w-[402px]">
          <figure>
            <div>
              <Image
                src="/frontlogo.svg"
                alt="Weave logo"
                width={402}
                height={200}
                priority
              />
            </div>
          </figure>
        </div>

        {/* Authentication Form Section */}
        <section className="px-7 py-11 mt-10 w-full rounded-3xl bg-prim-default max-w-[402px]">
          {/* Form Header */}
          <header className="flex flex-col gap-1.5 mb-6">
            <h2 className="text-3xl font-bold leading-10 text-white">
              Get Started
            </h2>
            <p className="text-base leading-5 text-prim-neutral max-w-[356px]">
              See what you look like wearing the clothes you want before you buy them.
            </p>
          </header>

          {/* Authentication Options */}
          <div
            className="flex flex-col gap-4"
            role="group"
            aria-label="Authentication options"
          >
            {/* Primary action: Log in */}
            <a href="/auth/login?returnTo=/onboarding">
              <div className={`${baseStyles} ${variantStyles.primary}`} aria-label="Login with email">
                Log in
              </div>
            </a>

            {/* Secondary action: Continue as guest */}
            <Link href="/onboarding">
              <div className={`${baseStyles} ${variantStyles.secondary}`} aria-label="Continue as guest">
                Continue as guest
              </div>
            </Link>
          </div>

          {/* Footer with Reset Password link */}
          <footer className="mt-7 text-center">
            <span className="text-md text-white">Can&apos;t log in? </span>
            <a
              href="#"
              className="text-md underline text-slate-200 hover:text-white transition-colors duration-200"
              aria-label="Reset your password"
            >
              Reset your password
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}