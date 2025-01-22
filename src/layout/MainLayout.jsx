import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/sidebar/AppSidebar";
import { ChevronRight } from "lucide-react";
import { AuthContext } from "@/providers/AuthProvider";

const getPathTitle = (path) => {
  switch (path) {
    case "company":
      return "Company";
    case "architect":
      return "Architect";
    case "companydetails":
      return "Company Details";
    case "uts":
      return "Ujian Tengah Semester";
    case "project":
      return "Project";
    case "history":
      return "History";
    default:
      return path;
  }
};

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { userProfile } = useContext(AuthContext);

  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((path, index, arr) => {
      const fullHref = "/" + arr.slice(0, index + 1).join("/");

      const title =
        path.includes("-") || path.includes("%")
          ? capitalizeFirstLetter(
              decodeURIComponent(path.replace(/-/g, " ")).split(" ")
            )
          : capitalizeFirstLetter(getPathTitle(path));
      return {
        href: fullHref,
        title: title,
      };
    });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="h-screen overflow-y-auto bg-color-50">
          {breadcrumbItems[breadcrumbItems.length - 1].title ===
          "Home" ? null : (
            <header className="flex flex-col h-28 shrink-0 items-center bg-color-700">
              <WaveBackground className="flex-1 w-full px-[1.1rem]">
                <h1 className="mb-2 text-white text-4xl leading-none bg-red- font-semibold">
                  {breadcrumbItems[breadcrumbItems.length - 1].title ??
                    "Default"}
                </h1>
              </WaveBackground>
              <div className="flex items-center gap-2 px-4 w-full bg-color-200 py-1 border-color-500">
                <SidebarTrigger className="-ml-1 text-color-900 hover:bg-color-300 hover:text-color-900" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 bg-color-900 "
                />
                <Breadcrumb>
                  <BreadcrumbList className="text-color-900">
                    <BreadcrumbItem>
                      <NavLink
                        to={"/home"}
                        className="hover:text-color-900 hover:bg-color-300 rounded-sm px-2"
                      >
                        Home
                      </NavLink>
                    </BreadcrumbItem>
                    <ChevronRight className="hidden md:block size-4" />
                    {pathname !== "/home" &&
                      breadcrumbItems.map((item, index) => (
                        <BreadcrumbItem key={item.href}>
                          <NavLink
                            to={item.href}
                            className="hover:text-color-900 hover:bg-color-300 rounded-sm px-1"
                          >
                            {item.title}
                          </NavLink>
                          {index < breadcrumbItems.length - 1 && (
                            <ChevronRight className="hidden md:block size-4" />
                          )}
                        </BreadcrumbItem>
                      ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
          )}

          <main
            className={`h-screen max-h-fit ${
              breadcrumbItems[breadcrumbItems.length - 1].title === "Home"
                ? userProfile.role === "client"
                  ? ""
                  : "mt-28"
                : "mt-4"
            } bg-color-50`}
          >
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;

export const WaveBackground = ({ children, className = "" }) => {
  return (
    <div
      className={`relative flex flex-col justify-center self-start h-18 pt-2 shrink-0 items-center overflow-hidden ${className}`}
    >
      {/* Wave Background Layers */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0 left-0 w-full h-full z-0"
        preserveAspectRatio="none"
      >
        {/* Middle Layer - Slightly Lighter */}
        <path
          fill="#b17d41"
          fillOpacity="0.4"
          d="M0,160L40,176C80,192,120,224,160,224C200,224,240,192,280,170.7C320,149,360,139,400,154.7C440,171,480,213,520,213.3C560,213,600,171,640,170.7C680,171,720,213,760,213.3C800,213,840,171,880,149.3C920,128,960,128,1000,138.7C1040,149,1080,171,1120,176C1160,181,1200,171,1240,165.3C1280,160,1320,160,1360,160C1400,160,1440,160,1440,160L1440,320L1400,320C1360,320,1320,320,1280,320C1240,320,1200,320,1160,320C1120,320,1080,320,1040,320C1000,320,960,320,920,320C880,320,840,320,800,320C760,320,720,320,680,320C640,320,600,320,560,320C520,320,480,320,440,320C400,320,360,320,320,320C280,320,240,320,200,320C160,320,120,320,80,320C40,320,20,320,0,320Z"
        />

        {/* Top Layer - Lightest */}
        <path
          fill="#c0914f"
          fillOpacity="0.3"
          d="M0,192L40,176C80,160,120,128,160,122.7C200,117,240,139,280,160C320,181,360,203,400,218.7C440,235,480,245,520,213.3C560,181,600,107,640,74.7C680,43,720,53,760,80C800,107,840,149,880,181.3C920,213,960,235,1000,224C1040,213,1080,171,1120,154.7C1160,139,1200,149,1240,165.3C1280,181,1320,203,1360,213.3C1400,224,1440,224,1440,224L1440,320L1400,320C1360,320,1320,320,1280,320C1240,320,1200,320,1160,320C1120,320,1080,320,1040,320C1000,320,960,320,920,320C880,320,840,320,800,320C760,320,720,320,680,320C640,320,600,320,560,320C520,320,480,320,440,320C400,320,360,320,320,320C280,320,240,320,200,320C160,320,120,320,80,320C40,320,20,320,0,320Z"
        />
      </svg>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
