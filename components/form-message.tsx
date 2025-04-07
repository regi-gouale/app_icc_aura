import React from "react";

export interface FormMessageProps {
  children: React.ReactNode;
}

export function FormMessage({ children }: FormMessageProps) {
  if (!children) {
    return null;
  }

  return <p className="text-sm text-red-500">{children}</p>;
}
