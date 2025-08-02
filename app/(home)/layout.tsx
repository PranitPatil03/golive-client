import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Navbar } from "@/components/navbar/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <SidebarInset>
              <main className="flex-1 overflow-auto mt-2 rounded-tl-xl shadow-sm border-t border-l">{children}</main>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
