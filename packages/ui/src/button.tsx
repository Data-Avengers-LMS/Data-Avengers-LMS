"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export default function Button({ children, className, appName }: ButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => console.log(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
}
