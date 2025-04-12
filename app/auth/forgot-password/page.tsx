"use client";

import { ForgotPasswordForm } from "@/lib/auth/forgot-password-form";
import { Suspense } from "react";
import ForgotPasswordLoading from "./loading";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Suspense fallback={<ForgotPasswordLoading />}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}
