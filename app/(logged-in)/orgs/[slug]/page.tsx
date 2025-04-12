import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import {
  getOrganizationBySlugCache,
  getSessionCache,
  getUserOrganizationsCache,
} from "@/lib/react/cache";
import { PageParams } from "@/types/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { InviteMemberButton } from "./invite-member-button";
import { MembersList } from "./members-list";
import { OrganizationDetails } from "./organization-details";

export default async function OrganizationPage(
  props: PageParams<{ slug: string }>
) {
  const session = await getSessionCache();

  if (!session) {
    redirect("/auth/signin");
  }

  const params = await props.params;

  try {
    const organization = await getOrganizationBySlugCache(params.slug);

    if (!organization) {
      redirect("/dashboard");
    }

    const userOrganizations = await getUserOrganizationsCache(session.user.id);

    // Vérifier que l'utilisateur est un membre de l'organisation
    const currentMember = organization.members.find(
      (member) => member.userId === session.user.id
    );

    if (!currentMember) {
      redirect("/dashboard");
    }

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
            {userOrganizations.length > 1 && <div></div>}
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
            <Suspense
              fallback={
                <div className="space-y-4">
                  <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              }
            >
              <OrganizationDetails
                organization={organization}
                isAdmin={isOwnerOrAdmin}
                userId={session.user.id}
              />
            </Suspense>

            {/* Liste des membres de l'organisation */}
            <div className="bg-white rounded-lg shadow p-6 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Membres de l'organisation
                </h2>
                {isOwnerOrAdmin && (
                  <Suspense>
                    <InviteMemberButton organizationId={organization.id} />
                  </Suspense>
                )}
              </div>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              >
                <MembersList
                  members={organization.members}
                  currentUserId={session.user.id}
                  currentUserRole={currentMember.role}
                  organizationId={organization.id}
                />
              </Suspense>
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
                    <div className="space-y-2"></div>
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
