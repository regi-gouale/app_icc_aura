"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Une erreur est survenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Nous nous excusons pour la gêne occasionnée. Notre équipe a été
            notifiée et travaille sur la résolution du problème.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={reset} variant="default">
            Réessayer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
