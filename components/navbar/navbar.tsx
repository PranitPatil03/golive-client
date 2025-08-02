"use client";

import { Search, Video, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { toggleSidebar, isMobile } = useSidebar();
  const router = useRouter();

  const user = {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  };

  const handleProfileClick = () => {
    router.push("/settings?section=profile");
  };

  const handleDropdownItem = (action: string) => {
    switch (action) {
      case "notifications":
        router.push("/notifications");
        break;
      case "profile":
        router.push("/settings?section=profile");
        break;
      case "theme":
        break;
      case "logout":
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-16 items-center bg-background px-4 p-5 shadow-md md:px-6 justify-between">
      <div className="flex items-center md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div>
          <Image
            src="/logo.svg"
            alt="GoLive"
            width={10}
            height={10}
            className="h-5 md:h-7 w-auto"
          />
        </div>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="lg"
          onClick={handleProfileClick}
          className="cursor-pointer hidden md:inline-flex"
        >
          Go Live
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative h-9 w-9 p-0 border-2 border-primary shadow-md hover:shadow-lg transition-all duration-150"
              style={{ borderRadius: "50%" }}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleDropdownItem("notifications")}>
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDropdownItem("profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDropdownItem("theme")}>
              Theme
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDropdownItem("logout")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
