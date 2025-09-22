'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button type="button" className={className} onClick={() => {}}>
      {children}
    </button>
  );
}
