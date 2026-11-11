"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavOperationsProps {
  items: {
    title: string;
    icon: React.ReactNode;
    children: string[];
  }[];
  label: string;
  unavailableLabel: string;
}

export function NavOperations({
  items,
  label,
  unavailableLabel,
}: NavOperationsProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              aria-disabled="true"
              className="cursor-not-allowed opacity-60"
              tooltip={`${item.title} — ${unavailableLabel}`}
            >
              {item.icon}
              <span>{item.title}</span>
              <span className="ml-auto text-[10px] text-muted-foreground group-data-[collapsible=icon]:hidden">
                {unavailableLabel}
              </span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child}>
                  <span
                    aria-disabled="true"
                    className="flex h-7 items-center gap-2 px-2 text-sm text-muted-foreground/70"
                  >
                    {child}
                  </span>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
