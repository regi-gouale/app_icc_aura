"use client";

import {
  ChartArea,
  DollarSignIcon,
  Frame,
  Map,
  Mic2Icon,
  NotebookText,
  PieChart,
  StickyNote,
  Users2Icon,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Membres",
      url: "#",
      icon: Users2Icon,
      isActive: true,
      items: [
        {
          title: "Tous",
          url: "#",
        },
        {
          title: "STAR",
          url: "#",
        },
        {
          title: "Responsables",
          url: "#",
        },
      ],
    },
    {
      title: "Entretiens",
      url: "#",
      icon: NotebookText,
      items: [
        {
          title: "Compte-rendus",
          url: "#",
        },
        {
          title: "Rendez-vous",
          url: "#",
        },
      ],
    },
    {
      title: "Croissance & Intégration",
      url: "#",
      icon: ChartArea,
      items: [
        {
          title: "Intégration",
          url: "#",
        },
        {
          title: "Accompagnement & Suivi",
          url: "#",
        },
        {
          title: "Discipolat",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  departments: [
    {
      name: "Impact Louange",
      url: "#",
      icon: Mic2Icon,
    },
    {
      name: "Sécretariat Général",
      url: "#",
      icon: StickyNote,
    },
    {
      name: "Gestion Financière",
      url: "#",
      icon: DollarSignIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { data: organizations } = authClient.useListOrganizations();
  // console.log("organizations", organizations);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.departments} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
