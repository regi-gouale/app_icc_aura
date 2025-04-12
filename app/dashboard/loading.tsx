import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-6 w-96 mb-8" />

      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-6 w-64 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
