"use client";

import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "w-full text-xl h-[54px] rounded-[300px] transition-colors duration-200";
  const variantStyles = {
    primary: "text-black shadow bg-prim-neutral hover:bg-slate-300",
    secondary: "text-white bg-prim-darkest hover:bg-slate-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};