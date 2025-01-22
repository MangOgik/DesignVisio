import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Album,
  CircleCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { jwtStorage } from "@/utils/jwt_storage";
import { useContext, useEffect, useState } from "react";
import useLogout from "@/hooks/use-logout";
import { AuthContext } from "@/providers/AuthProvider";

export function NavUser() {
  const { isMobile } = useSidebar();
  const handleLogout = useLogout();
  const { userProfile } = useContext(AuthContext);

  let altUser = userProfile.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "CN";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-color-200 data-[state=open]:text-color-950  text-color-950 hover:text-color-950 hover:bg-color-200 active:bg-color-300 active:text-color-950 transition-colors duration-200"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={"/blackprofil.jpg"} alt={userProfile.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userProfile.name}</span>
                <span className="truncate text-xs">{userProfile.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="rounded-lg">
                    {altUser}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight text-color-950">
                  <span className="truncate font-semibold">{userProfile.name}</span>
                  <span className="truncate text-xs">{userProfile.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <NavLink to="/uts">
                <DropdownMenuItem className="text-color-950 focus:bg-color-100 focus:text-color-950">
                  <Album />
                  Mid Semester Exam
                </DropdownMenuItem>
              </NavLink>
              <NavLink to="/account">
                <DropdownMenuItem className="text-color-950 focus:bg-color-100 focus:text-color-950">
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-color-950 focus:bg-color-100 focus:text-color-950"
              onClick={handleLogout}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
