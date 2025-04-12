import CardDashboard from "@/components/card-dashboard";
import { PrayerGraph } from "@/components/prayer-graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrganizationBySlugCache, getSessionCache } from "@/lib/react/cache";
import { PageParams } from "@/types/next";
import { NotebookPenIcon, StarIcon, Users2Icon } from "lucide-react";
import { redirect } from "next/navigation";

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

    // const userOrganizations = await getUserOrganizationsCache(session.user.id);

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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <div className="lg:col-span-3">

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


            <div className="bg-white rounded-lg shadow p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
              <p className="text-gray-500 text-sm">
                Les statistiques d'activité seront bientôt disponibles.
              </p>
            </div>
          </div> */}

          <CardDashboard
            title={"Nombre de membres"}
            value={1000}
            description={"+ 5% par rapport au mois dernier"}
            icon={<Users2Icon className="size-4" />}
          />
          <CardDashboard
            title={"Nombre de STAR"}
            value={300}
            description={"+10% par rapport au mois dernier"}
            icon={<StarIcon className="size-4" />}
          />
          <CardDashboard
            title={"Entretiens ce mois"}
            value={75}
            description={"+ 2% par rapport au mois dernier"}
            icon={<NotebookPenIcon className="size-4" />}
          />
          <CardDashboard
            title={"Mes entretiens"}
            value={10}
            description={"Vous avez 2 entretiens à venir."}
            icon={<NotebookPenIcon className="size-4" />}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 mt-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Moyenne participations aux cultes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PrayerGraph />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Compte-rendu récents</CardTitle>
              <CardDescription>
                Il y a eu 4567 compte-rendus ce mois.
              </CardDescription>
            </CardHeader>
            <CardContent>{/* <RecentNotes /> */}</CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching organization:", error);
    redirect("/dashboard");
  }
}
