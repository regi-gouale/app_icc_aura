import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { getSessionCache, getUserOrganizationsCache } from "@/lib/react/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardLoading from "./loading";
import { OrganizationManager } from "./organization-manager";

export default async function DashboardPage() {
  const session = await getSessionCache();

  if (!session) {
    redirect("/auth/signin");
  }

  const userOrganizations = await getUserOrganizationsCache(session.user.id);

  const userName = session.user?.name || "Utilisateur";
  const userRole = session.user?.role || "USER";

  // Si l'utilisateur a une organisation active, on le redirige vers celle-ci
  const activeOrganizationId = session.session.activeOrganizationId;

  if (activeOrganizationId) {
    // Récupérer le slug de l'organisation active
    const activeOrganization = userOrganizations.find(
      (org) => org.id === activeOrganizationId
    );

    if (activeOrganization) {
      redirect(`/orgs/${activeOrganization.slug}`);
    }
  }

  // Si l'utilisateur a des organisations mais pas d'organisation active
  // on définit la première organisation comme active et on redirige
  if (userOrganizations && userOrganizations.length > 0) {
    const activeOrganization = userOrganizations[0];
    redirect(`/orgs/${activeOrganization.slug}`);
  }

  return (
    <Suspense fallback={<DashboardLoading />}>
      <div className="container mx-auto px-4 py-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <form action={signOut}>
            <Button variant="outline" type="submit">
              Se déconnecter
            </Button>
          </form>
        </div>

        <p className="text-lg mb-8">
          Bienvenue sur votre tableau de bord, {userName} !
        </p>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Gestion des organisations
          </h2>

          <p className="text-gray-600 mb-6">
            Vous n'avez pas encore d'organisation.
            {userRole === "admin"
              ? " En tant qu'administrateur, vous pouvez créer une nouvelle organisation."
              : " Vous avez besoin d'un code d'invitation pour rejoindre une organisation existante."}
          </p>

          <OrganizationManager userRole={userRole} />
        </div>
      </div>
    </Suspense>
  );
}
