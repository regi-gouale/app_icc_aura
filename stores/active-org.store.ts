import { create } from "zustand";

export const useDashboardStore = create<{
  activeOrganizationSlug: string;
  setActiveOrganizationSlug: (slug: string) => void;
}>((set) => ({
  activeOrganizationSlug: "",
  setActiveOrganizationSlug: (slug: string) =>
    set({ activeOrganizationSlug: slug }),
}));
