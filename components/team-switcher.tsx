"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { data: organizations } = authClient.useListOrganizations();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const [activeOrg, setActiveOrg] = useState(activeOrganization);

  if (!activeOrg) {
    if (organizations && organizations.length > 0) {
      console.log(
        "Setting active team to first organization: ",
        organizations[0]
      );
      setActiveOrg(organizations[0]);
    }
  }

  if (!organizations || organizations.length === 0) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground shadow-sm"
            >
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full border bg-transparent text-sm">
                <span>
                  {activeOrg?.logo ? (
                    <Image
                      src={activeOrg.logo}
                      alt={`${activeOrg.name} logo`}
                      className="size-4"
                    />
                  ) : (
                    <span className="size-4 text-primary">
                      {activeOrg?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeOrg?.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Églises
            </DropdownMenuLabel>
            {organizations.map((organization, index) => (
              <DropdownMenuItem
                key={organization.name}
                onClick={() => setActiveOrg(organization)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-full border">
                  {organization.logo ? (
                    <Image
                      src={organization.logo}
                      alt={`${organization.name} logo`}
                      className="size-4"
                    />
                  ) : (
                    <span className="size-4 text-primary text-center align-top">
                      {organization.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {organization.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Ajouter une église
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
