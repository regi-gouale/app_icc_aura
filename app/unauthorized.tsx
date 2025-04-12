import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Accès non autorisé</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Vous n&apos;avez pas les permissions nécessaires pour accéder à
            cette page.
          </p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/auth/signin">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
