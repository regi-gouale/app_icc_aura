import { SignInForm } from "@/lib/auth/signin-form";
import { getSessionCache } from "@/lib/react/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SignInLoading from "./loading";

export default async function SignIn() {
  const session = await getSessionCache();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Suspense fallback={<SignInLoading />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
