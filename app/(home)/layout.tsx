import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen max-h-screen bg-accent w-full">
        <div className="fixed top-4 right-0 z-50 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-col px-4 overflow-y-auto bg-accent w-full h-full">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;