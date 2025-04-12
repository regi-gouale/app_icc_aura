import { SoulsTable } from "@/components/souls-table";
import { prisma } from "@/lib/prisma";
import { getOrganizationBySlugCache } from "@/lib/react/cache";
import { PageParams } from "@/types/next";
import { Soul } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound, unauthorized } from "next/navigation";

export default async function AllMembersPage(
  props: PageParams<{ slug: string }>
) {
  const params = await props.params;
  const slug = params.slug;
  if (!slug) {
    return unauthorized();
  }
  const activeOrganization = await getOrganizationBySlugCache(slug);

  if (!activeOrganization) {
    return notFound();
  }

  const allOrganizationsSouls: Soul[] = await prisma.soul.findMany({
    where: {
      OrganizationId: activeOrganization.id,
    },
    orderBy: {
      lastName: "asc",
    },
  });

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Tous les membres
            </h2>
            <Link
              href={`/orgs/${slug}/souls/add`}
              className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-primary p-2 font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:rounded-xl md:px-4 md:py-2"
            >
              <PlusIcon className="size-4 text-primary-foreground" />
              <span className="hidden md:block">Membre</span>
            </Link>
          </div>
          <SoulsTable
            souls={JSON.parse(JSON.stringify(allOrganizationsSouls))}
          />
        </div>
      </div>
    </>
  );
}
