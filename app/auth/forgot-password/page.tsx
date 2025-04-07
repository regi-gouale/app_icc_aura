"use client";

import { ForgotPasswordForm } from "@/lib/auth/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <ForgotPasswordForm />
    </div>
  );
}
