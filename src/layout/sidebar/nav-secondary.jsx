import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavSecondary({ items, ...props }) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="text-color-900">Booking</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavLink to={item.url} key={item.title}>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  variant="default"
                  className={cn(
                    "flex items-center justify-between w-full cursor-pointer",
                    "active:bg-color-300 active:text-color-950",
                    "hover:bg-color-200 hover:text-color-950"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} />
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
