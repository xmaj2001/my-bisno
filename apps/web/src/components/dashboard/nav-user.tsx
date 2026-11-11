"use client";

import { UserRound } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser({ label }: { label: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" tooltip={label}>
          <span className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent">
            <UserRound className="size-4" />
          </span>
          <span className="truncate text-sm font-medium">{label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
