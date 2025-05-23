import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <TopBar />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>

    // <div className="[--header-height:calc(theme(spacing.14))]">
    //   <SidebarProvider className="flex flex-col">
    //     <TopBar />
    //     <div className="flex flex-1">
    //       <AppSidebar />
    //       <SidebarInset>
    //         {/* <TopBar /> */}
    //         <div className="flex flex-1 flex-col gap-4 p-4">
    //           <Outlet />
    //         </div>
    //       </SidebarInset>
    //     </div>
    //   </SidebarProvider>
    // </div>
  )
}



// import { AppSidebar } from "@/components/AppSidebar";
// import TopBar from "@/components/TopBar";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export default function MainLayout() {
//   return (
//     <section>
//       <TopBar />
//       <div className="flex relative">
//         <AppSidebar />
//         <ScrollArea className='h-[calc(100vh-60px)] w-full p-6'>
//           <Outlet />
//         </ScrollArea>
//       </div>
//     </section>
//   )
// };
