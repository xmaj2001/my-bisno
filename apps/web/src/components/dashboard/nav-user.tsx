"use client";

import {
  BellIcon,
  ChevronsUpDownIcon,
  LoaderCircle,
  LogOutIcon,
  SettingsIcon,
  UserRound,
  WalletCardsIcon,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/features/auth/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavUser({ label }: { label: string }) {
  const { data, isPending, isRefetching, refetch } = authClient.useSession();
  const router = useRouter();
  const { isMobile } = useSidebar();

  const handlerSignOut = async () => {
    const data = await authClient.signOut({
      disableRedirect: false,
    });
    router.refresh();
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu disabled={isPending || isRefetching}>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            {isPending ? (
              <LoaderCircle className="animate-spin text-primary" />
            ) : (
              <Avatar className="rounded-xs">
                {data?.user.image && (
                  <AvatarImage src={data?.user.image} alt={data?.user.name} />
                )}
                <AvatarFallback className="rounded-xs">
                  {data?.user.name.at(2)}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{data?.user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {data?.user.email}
              </span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xs border-border"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                  <Avatar className="rounded-xs size-8">
                    {data?.user.image && (
                      <AvatarImage
                        src={data?.user.image}
                        alt={data?.user.name}
                      />
                    )}
                    <AvatarFallback className="rounded-xs">
                      {data?.user.name.at(2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold">
                      {data?.user.name}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {data?.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href="/system/settings" />}>
                <SettingsIcon className="size-4 mr-2" />
                Definições
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/system/wallet" />}>
                <WalletCardsIcon className="size-4 mr-2" />
                Minha Wallet
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/system/settings" />}>
                <BellIcon className="size-4 mr-2" />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handlerSignOut}
              className="text-red-600 focus:text-red-600"
            >
              <LogOutIcon className="size-4 mr-2" />
              Terminar Sessão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
