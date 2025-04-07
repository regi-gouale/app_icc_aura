import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const userName = session.user?.name || "Utilisateur";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <form action={signOut}>
          <Button variant="outline" type="submit">
            Se déconnecter
          </Button>
        </form>
      </div>
      <p className="text-lg">
        Bienvenue sur votre tableau de bord, {userName} !
      </p>
    </div>
  );
}
