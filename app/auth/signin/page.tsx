"use client";

import { SignInForm } from "@/lib/auth/signin-form";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <SignInForm />
    </div>
  );
}
