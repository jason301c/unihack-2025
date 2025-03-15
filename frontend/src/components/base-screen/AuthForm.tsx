/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Button } from "./AuthButton";
import Link from "next/link";

export const AuthForm: React.FC = () => {
  return (
    <section className="px-7 py-11 mt-10 w-full rounded-3xl bg-prim-default max-w-[402px]">
      <header className="flex flex-col gap-1.5 mb-6">
        <h2 className="text-3xl font-bold leading-10 text-white">
          Get Started
        </h2>
        <p className="text-base leading-5 text-prim-neutral max-w-[356px]">
          See what you look like wearing the clothes you want before you buy
          them.
        </p>
      </header>

      <div
        className="flex flex-col gap-4"
        role="group"
        aria-label="Authentication options"
      >
        <Link href="/api/auth/login">
          <Button variant="primary" aria-label="Login with email">
            Login
          </Button>
        </Link>

        <Button
          variant="secondary"
          onClick={() => (window.location.href = "/onboarding")}
          aria-label="Continue as guest"
        >
          Continue as guest
        </Button>
      </div>

      <footer className="mt-7 text-center">
        <span className="text-xs text-white">Can't log in? </span>
        <a
          href="#"
          className="text-xs underline text-slate-200 hover:text-white transition-colors duration-200"
          aria-label="Reset your password"
        >
          Reset Password
        </a>
      </footer>
    </section>
  );
};
