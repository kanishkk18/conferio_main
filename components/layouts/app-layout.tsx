// import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset className={`overflow-x-hidden p-0 !bg-[#fafafa]`}>
        <div
          className="w-full flex flex-1 flex-col gap-1 px-3 lg:px-8 max-w-[1300px]
         mx-auto
        "
        >
          <>
            <Header />
            <div className="pb-8">
              { children }
            </div>
          </>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
