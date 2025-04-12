"use client";

import { useDashboardStore } from "@/stores/active-org.store";
import { redirect } from "next/navigation";

export const gotoOrg = (slug: string | undefined = undefined) => {
  const { setActiveOrganizationSlug } = useDashboardStore();
  if (!slug) {
    redirect("/dashboard");
  }

  // Mettre à jour le slug de l'organisation active dans le store
  setActiveOrganizationSlug(slug);

  // Rediriger vers l'organisation active
  redirect(`/orgs/${slug}`);
};

export const getActiveOrgSlug = () => {
  const { activeOrganizationSlug } = useDashboardStore();
  if (!activeOrganizationSlug) {
    redirect("/dashboard");
  }

  return activeOrganizationSlug;
};
