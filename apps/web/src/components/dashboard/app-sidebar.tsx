"use client";

import { ClipboardList, MapPinned, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavOperations } from "@/components/dashboard/nav-operations";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Dictionary } from "@/i18n/get-dictionary";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  lang: string;
  translations: Dictionary["dashboard"]["sidebar"];
}

export function AppSidebar({ lang, translations, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const stockUrl = `/${lang}/system/stocks`;

  const mainItems = [
    {
      title: translations.stock,
      url: stockUrl,
      icon: <Package />,
    },
    {
      title: translations.catalog,
      url: `/${lang}/products`,
      icon: <ShoppingBag />,
    },
  ].map((item) => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(`${item.url}/`),
  }));

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={translations.brand}
              render={<Link href={stockUrl} aria-label={translations.brand} />}
            >
              <div className="flex size-8 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                <AnimatedLogo />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">BISNO</span>
                <span className="truncate text-xs">
                  {translations.brandSubtitle}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={mainItems}
          label={translations.mainGroup}
          toggleLabel={translations.expandMenu}
        />
        <NavOperations
          items={[
            {
              title: translations.orders,
              icon: <ClipboardList />,
              children: [translations.orderTracking, translations.deliveries],
            },
            {
              title: translations.regions,
              icon: <MapPinned />,
              children: [
                translations.provinceCoverage,
                translations.regionCoverage,
              ],
            },
          ]}
          label={translations.operationsGroup}
          unavailableLabel={translations.comingSoon}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser label={translations.affiliateArea} />
      </SidebarFooter>
    </Sidebar>
  );
}
