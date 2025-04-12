import { SoulsTable } from "@/components/souls-table";
import { prisma } from "@/lib/prisma";
import { getOrganizationBySlugCache } from "@/lib/react/cache";
import { PageParams } from "@/types/next";
import { type Soul, SoulStatus } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function StarMembersPage(
  props: PageParams<{ slug: string }>
) {
  const params = await props.params;
  const slug = params.slug;
  const organization = await getOrganizationBySlugCache(slug);

  if (!organization) {
    return notFound();
  }

  const allOrganizationsStarMembers: Soul[] = await prisma.soul.findMany({
    where: {
      OrganizationId: organization.id,
      NOT: {
        status: SoulStatus.MEMBER,
      },
    },
  });

  console.log("allOrganizationsStarMembers", allOrganizationsStarMembers);

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">STAR</h2>
          </div>
          <SoulsTable
            souls={JSON.parse(JSON.stringify(allOrganizationsStarMembers))}
          />
        </div>
      </div>
    </>
  );
}
