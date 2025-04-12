import { SignUpForm } from "@/lib/auth/signup-form";
import { getSessionCache } from "@/lib/react/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SignUpLoading from "./loading";

export default async function SignUp() {
  const session = await getSessionCache();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Suspense fallback={<SignUpLoading />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
