import * as React from 'react';
import {
    Table,
    PieChart,
    FilePlus,
    UserPlus,
    AlertCircle,
    MessagesSquare,
    ClipboardCheck,
    LayoutGrid,
    LogOut,
    Users,
    UsersRound,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavLink, useNavigate } from 'react-router';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();

    // Menu items.
    const items = [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid, end: true },
        { title: 'Users', url: '/dashboard/users', icon: PieChart, end: true, },
        { title: 'Projects', url: '/dashboard/projects', icon: Table, end: true },
        { title: 'Member', url: '/dashboard/member', icon: UsersRound, end: true },
        { title: 'Project Add', url: '/dashboard/project-add', icon: FilePlus, end: true },
        { title: 'Project Assign', url: '/dashboard/project-assign', icon: UserPlus, end: true },
        { title: 'Project Issue', url: '/dashboard/project-issue', icon: AlertCircle, end: true },
        { title: 'Project Message', url: '/dashboard/project-message', icon: MessagesSquare, end: true, },
        { title: 'Project Resource', url: '/dashboard/project-resource', icon: ClipboardCheck, end: true, },
        { title: 'Team', url: '/dashboard/team', icon: Users, end: true },
    ];

    console.log('items', items);

    return (
        <section className="">
            <Sidebar collapsible="icon" {...props} className="pt-[60px]">
                <SidebarTrigger size={'lg'} className="text-[#6B6B6B] !size-10 self-end m-1" />

                <SidebarContent>
                    <SidebarMenu className="px-2">
                        {items.map((item, i) => (
                            <SidebarMenuItem key={i}>
                                <NavLink
                                    to={item.url}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `w-full ${isActive ? 'bg-white text-primary' : 'text-[#797979]'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <SidebarMenuButton
                                            size="lg"
                                            tooltip={item.title}
                                            className={`w-full hover:text-primary  ${isActive ? '!bg-muted !text-primary shadow-sm' : ''
                                                }`}
                                        >
                                            <item.icon className="!size-7 transition-colors pl-0.5" />
                                            <h4 className="text-lg text-nowrap duration-300">
                                                {item.title}
                                            </h4>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    localStorage.removeItem('persist:userInfo');
                                    navigate('/login', { replace: true });
                                }}
                            >
                                <LogOut /> <span>Log Out</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </section>
    );
}
