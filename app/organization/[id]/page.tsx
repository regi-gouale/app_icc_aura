import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { auth } from "@/lib/auth";
import { PageParams } from "@/types/next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { InviteMemberButton } from "./invite-member-button";
import { MembersList } from "./members-list";
import { OrganizationDetails } from "./organization-details";

export default async function OrganizationPage(
  props: PageParams<{ id: string }>
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }
  const params = await props.params;
  // Récupérer les informations de l'organisation
  try {
    const organization = await auth.api.getFullOrganization({
      organizationId: params.id,
      headers: await headers(),
    });

    if (!organization) {
      // Si l'organisation n'existe pas, rediriger vers le tableau de bord
      redirect("/dashboard");
    }

    // Vérifier que l'utilisateur est un membre de l'organisation
    const currentMember = organization.members.find(
      (member) => member.userId === session.user.id
    );

    if (!currentMember) {
      // Si l'utilisateur n'est pas membre, rediriger vers le tableau de bord
      redirect("/dashboard");
    }

    // Récupérer les organisations de l'utilisateur pour la sélection
    const userOrganizations = await auth.api.listOrganizations({
      headers: await headers(),
    });

    // Déterminer les permissions de l'utilisateur
    const isOwnerOrAdmin =
      currentMember.role.includes("owner") ||
      currentMember.role.includes("admin");

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">{organization.name}</h1>
            {organization.slug && (
              <p className="text-gray-500">Slug: {organization.slug}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {userOrganizations.length > 1 && (
              <div>
                {/* <form action="/api/organization/switch" method="POST">
                  <input type="hidden" name="redirect" value="/dashboard" />
                  <Button variant="outline" type="submit">
                    Changer d'organisation
                  </Button>
                </form> */}
              </div>
            )}
            <form action={signOut}>
              <Button variant="outline" type="submit">
                Se déconnecter
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Affichage des détails de l'organisation */}
            <OrganizationDetails
              organization={organization}
              isAdmin={isOwnerOrAdmin}
              userId={session.user.id}
            />

            {/* Liste des membres de l'organisation */}
            <div className="bg-white rounded-lg shadow p-6 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Membres de l'organisation
                </h2>
                {isOwnerOrAdmin && (
                  <InviteMemberButton organizationId={organization.id} />
                )}
              </div>
              <MembersList
                members={organization.members}
                currentUserId={session.user.id}
                currentUserRole={currentMember.role}
                organizationId={organization.id}
              />
            </div>
          </div>

          <div>
            {/* Panneau latéral avec les statistiques et informations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Informations</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date de création</p>
                  <p className="font-medium">
                    {new Date(organization.createdAt).toLocaleDateString(
                      "fr-FR"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nombre de membres</p>
                  <p className="font-medium">{organization.members.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Votre rôle</p>
                  <p className="font-medium">{currentMember.role}</p>
                </div>
                {currentMember.role.includes("owner") && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-medium mb-2">
                      Actions administrateur
                    </h3>
                    <div className="space-y-2">
                      {/* <form
                        action="/api/organization/export-data"
                        method="POST"
                      >
                        <input
                          type="hidden"
                          name="organizationId"
                          value={organization.id}
                        />
                        <Button
                          variant="outline"
                          type="submit"
                          className="w-full"
                        >
                          Exporter les données
                        </Button>
                      </form> */}

                      {/* <form
                        action="/api/organization/delete"
                        method="POST"
                        onSubmit={(e) => {
                          if (
                            !confirm(
                              "Êtes-vous sûr de vouloir supprimer cette organisation ? Cette action est irréversible."
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input
                          type="hidden"
                          name="organizationId"
                          value={organization.id}
                        />
                        <Button
                          variant="destructive"
                          type="submit"
                          className="w-full"
                        >
                          Supprimer l'organisation
                        </Button>
                      </form> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistiques ou informations supplémentaires */}
            <div className="bg-white rounded-lg shadow p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
              <p className="text-gray-500 text-sm">
                Les statistiques d'activité seront bientôt disponibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching organization:", error);
    redirect("/dashboard");
  }
}
