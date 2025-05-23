import * as React from "react"
import {
  ClipboardCheck,
  LayoutGrid,
  LogOut,
  NotepadText,
  Settings,
  SquarePen,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router"
import { Collapsible } from "../ui/collapsible";


export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  // Menu items.
  const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutGrid, end: true },
    { title: "Member", url: "/dashboard/member", icon: UsersRound, end: true },
    { title: "User", url: "/dashboard/users", icon: UserRound, end: true },
    { title: "Project", url: "/", icon: NotepadText, end: true },
    { title: "Team", url: "/", icon: Users, end: true },
    { title: "Assignment", url: "/", icon: SquarePen, end: true },
    { title: "Project Resource", url: "/", icon: ClipboardCheck, end: true },
    { title: "Settings", url: "/", icon: Settings, end: true },
  ];

  return (
    <section className="">
      <Sidebar collapsible="icon" {...props} className="pt-[60px]">
        <SidebarTrigger className="text-[#6B6B6B] ml-auto mt-2.5 mr-2.5" />

        <SidebarContent>
          <SidebarMenu className="px-2">
            {items.map((item, i) => (
              <Collapsible
                key={i}
                className={`flex items-center gap-4 group }`}
              >
                <NavLink
                  to={item.url}
                  end={item.end}
                  className={({ isActive }) =>
                    `w-full ${isActive ? `bg-[#EBEBED] text-primary rounded-md` : "text-[#6B6B6B] rounded-md"}`
                  }
                >
                  <SidebarMenuItem className="w-full">
                    <SidebarMenuButton
                      size='lg'
                      tooltip={item.title}
                      className={`flex items-center gap-4 w-full`}
                    >
                      <item.icon className="size-32 group-hover:text-primary transition-colors" />
                      <h4
                        className={`text-xl text-nowrap group-hover:text-primary duration-300`}
                      >
                        {item.title}
                      </h4>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </NavLink>
              </Collapsible>
            ))}
          </SidebarMenu>


        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  localStorage.removeItem('persist:userInfo')
                  navigate("/login", { replace: true })
                }}
              >
                <LogOut /> <span >Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </section>
  )
};
