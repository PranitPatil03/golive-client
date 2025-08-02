"use client";

import { type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const router = useRouter();

  return (
    <SidebarGroup className="font-mono">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {/* Go Live button only on mobile */}
        <SidebarMenuItem className="md:hidden p-1">
          <SidebarMenuButton
            asChild
            tooltip="Go Live"
            className="bg-primary text-white font-semibold flex items-center justify-center"
            onClick={() => router.push("/settings?section=profile")}
          >
            <button type="button">
              <span>Go Live</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {items.map((item) => (
          <SidebarMenuItem key={item.title} className="p-1">
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              data-active={item.isActive}
              className={
                item.isActive ? "bg-white text-black border shadow-sm" : ""
              }
            >
              <a href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}