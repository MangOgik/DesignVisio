import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavMain({ items }) {
  const location = useLocation();

  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (title) => {
    setOpenItems(
      (currentOpenItems) =>
        currentOpenItems.includes(title)
          ? currentOpenItems.filter((item) => item !== title)
          : [...currentOpenItems, title]    );
  };

  const isSubItemActive = (subItem) => {
    return location.pathname.includes(subItem.url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-color-900">Main Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          return <Collapsible
            key={item.title}
            open={openItems.includes(item.title)} 
            onOpenChange={() => handleToggle(item.title)}
          >
            <SidebarMenuItem className="relative">
              <CollapsibleTrigger asChild>
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
                  <ChevronRight
                    className={cn(
                      "transform transition-transform duration-200 ease-in-out",
                      openItems.includes(item.title) && "rotate-90" // Rotate chevron if open
                    )}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            {item.items?.length ? (
              <CollapsibleContent className="transition-all duration-300 ease-in-out">
                <SidebarMenuSub className="overflow-hidden">
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className="transform transition-all duration-200 ease-in-out"
                    >
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          "text-color-900 w-full",
                          "hover:bg-color-100 hover:text-color-950 ",
                          "active:bg-color-200 active:text-color-950",
                          "transition-colors duration-200",
                          isSubItemActive(subItem) &&
                            "bg-color-100 text-color-950"
                        )}
                      >
                        <NavLink to={subItem.url}>
                          <span>{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            ) : null}
          </Collapsible>;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
