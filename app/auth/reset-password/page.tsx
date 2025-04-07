"use client";

import { ResetPasswordForm } from "@/lib/auth/reset-password-form";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <ResetPasswordForm token={token} />
    </div>
  );
}
