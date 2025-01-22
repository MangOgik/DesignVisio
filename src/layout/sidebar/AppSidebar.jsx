import { NavMain } from "@/layout/sidebar/nav-main";
import { NavUser } from "@/layout/sidebar/nav-user";

import { Album, Building2, FolderOpen, LifeBuoy, Send } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { NavSecondary } from "./nav-secondary";
// import useAuthStore from "@/stores/auth-store";

const data = {
  navMain: [
    {
      title: "Find Architects",
      url: "",
      icon: Building2,
      isActive: true,
      items: [
        {
          title: "Company",
          url: "/company",
        },
        {
          title: "Architect",
          url: "/architect",
        },
      ],
    },
    {
      title: "My Projects",
      url: "",
      icon: FolderOpen,
      isActive: true,
      items: [
        {
          title: "Current Project",
          url: "/project",
        },
        {
          title: "Project History",
          url: "/history",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Booking",
      url: "/booking",
      icon: Album,
    },
  ],
};

export function AppSidebar(props) {
  const location = useLocation();
  const { userProfile } = useContext(AuthContext);
  const role = userProfile.role;

  const processedNavMain = data.navMain.map((item) => ({
    ...item,
    isActive:
      location.pathname === item.url ||
      item.items?.some((subItem) => location.pathname === subItem.url),
  }));

  return (
    <Sidebar variant="" {...props} className="bg-white">
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary">
                  <img
                    src={`/LogoDesignVisioWhite.svg`}
                    alt="Design Visio Logo"
                    className="w-6 h-6"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Design Visio</span>
                  <span className="truncate text-xs">
                    Design Your Dream Space
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain
          items={role === "client" ? processedNavMain : [processedNavMain[1]]}
        />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
