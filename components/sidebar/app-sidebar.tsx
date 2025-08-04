"use client";

import * as React from "react";
import { Home, CreditCard, Settings2, MessageSquare } from "lucide-react";
import Image from "next/image";

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
  const {isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "none"}
      {...props}
      className="overflow-hidden bg-background"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          {isMobile && (
            <Image
              src="/logo.svg"
              alt="GoLive"
              width={10}
              height={10}
              className="h-7 w-auto"
            />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavBottom items={data.navBottom} />
      </SidebarFooter>
      {isMobile && <SidebarRail />}
    </Sidebar>
  );
}
