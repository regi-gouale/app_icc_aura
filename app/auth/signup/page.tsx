"use client";

import { SignUpForm } from "@/lib/auth/signup-form";

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <SignUpForm />
    </div>
  );
}
