"use client";

import * as React from "react";
import { Home, CreditCard, Settings2, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { NavMain } from "./nav-main";
import { NavBottom } from "./nav-bottom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: CreditCard,
    },
  ],
  navBottom: [
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, state } = useSidebar();
  const { theme } = useTheme();

  // Determine which logo to show based on collapsed state and theme
  const getLogoSrc = () => {
    if (state === "collapsed" && !isMobile) {
      return "/golive-icon.svg";
    }
    return theme === "dark" ? "/golive-white.svg" : "/logo.svg";
  };

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"}
      {...props}
      className="overflow-hidden bg-background transition-all duration-300 ease-in-out"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
          <div className="relative overflow-hidden">
            <Image
              src={getLogoSrc()}
              alt="GoLive"
              width={32}
              height={32}
              className={`w-auto transition-all duration-500 ease-in-out transform ${
                state === "collapsed" ? "h-10 scale-110" : "h-7 scale-100"
              }`}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavBottom items={data.navBottom} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
