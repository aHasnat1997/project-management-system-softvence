import { AppSidebar } from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <section>
      <TopBar />
      <div className="flex relative">
        <AppSidebar />
        <ScrollArea className='h-[calc(100vh-60px)] w-full p-6'>
          <Outlet />
        </ScrollArea>
      </div>
    </section>
  )
};
