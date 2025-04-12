import { Skeleton } from "@/components/ui/skeleton";

export default function ForgotPasswordLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Skeleton className="h-8 w-full max-w-sm" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
