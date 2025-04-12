import { AddSoulForm } from "@/components/add-soul-form";
import { getOrganizationBySlugCache } from "@/lib/react/cache";
import { PageParams } from "@/types/next";
import { unauthorized } from "next/navigation";

export default async function AddMemberPage(
  props: PageParams<{ slug: string }>
) {
  const params = await props.params;
  const slug = params.slug;
  if (!slug) {
    return unauthorized();
  }
  const activeOrganization = await getOrganizationBySlugCache(slug);
  if (!activeOrganization) {
    return unauthorized();
  }

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Ajouter un membre
          </h2>
          <div className="flex items-center justify-center">
            <AddSoulForm
              organizationSlug={slug}
              organizationId={activeOrganization.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
