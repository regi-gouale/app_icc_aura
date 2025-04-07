import { auth } from "@/lib/auth";
import { SignUpForm } from "@/lib/auth/signup-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <SignUpForm />
    </div>
  );
}
