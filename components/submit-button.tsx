"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loadingText?: string;
}

export function SubmitButton({
  children,
  loadingText,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const text = pending ? loadingText || `${children} en cours...` : children;

  return (
    <Button type="submit" disabled={pending} {...props}>
      {text}
    </Button>
  );
}
