import * as React from 'react';
import {
    LayoutGrid,
    LogOut,
    UsersRound,
    UserRound,
    Clipboard,
    Contact,
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
import useCurrentUser from '@/hooks/useCurrentUser';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    console.log(currentUser?.role);

    // Menu items.
    const items = [];

    switch (currentUser?.role) {
        case 'Admin':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                { title: 'Users', url: '/dashboard/users', icon: <UserRound />, end: true, },
                { title: 'Projects', url: '/dashboard/projects', icon: <Clipboard />, end: false },
                { title: 'Members', url: '/dashboard/member', icon: <UsersRound />, end: true },
                { title: 'Teams', url: '/dashboard/team', icon: <Contact />, end: true }
            );
            break;

        case 'Management':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                { title: 'Users', url: '/dashboard/users', icon: <UserRound />, end: true, },
                { title: 'Projects', url: '/dashboard/projects', icon: <Clipboard />, end: false },
                { title: 'Members', url: '/dashboard/member', icon: <UsersRound />, end: true },
                { title: 'Teams', url: '/dashboard/team', icon: <Contact />, end: true }
            );
            break;
        case 'Operation':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                { title: 'Projects', url: '/dashboard/projects', icon: <Clipboard />, end: false },
                { title: 'My Team', url: '/dashboard/team', icon: <Contact />, end: true }
            );
            break;

        case 'Sells':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                { title: 'Projects', url: '/dashboard/projects', icon: <Clipboard />, end: false },
                { title: 'My Team', url: '/dashboard/team', icon: <Contact />, end: true }
            );
            break;

        default:
            items.push({});
            break;
    };

    if (items.length < 0) {
        return;
    }

    // items = [
    //     { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid, end: true },
    //     { title: 'Users', url: '/dashboard/users', icon: PieChart, end: true, },
    //     { title: 'Projects', url: '/dashboard/projects', icon: Table, end: false },
    //     { title: 'Member', url: '/dashboard/member', icon: UsersRound, end: true },
    //     { title: 'Project Assign', url: '/dashboard/project-assign', icon: UserPlus, end: true },
    //     { title: 'Project Issue', url: '/dashboard/project-issue', icon: AlertCircle, end: true },
    //     { title: 'Project Message', url: '/dashboard/project-message', icon: MessagesSquare, end: true, },
    //     { title: 'Project Resource', url: '/dashboard/project-resource', icon: ClipboardCheck, end: true, },
    //     { title: 'Team', url: '/dashboard/team', icon: Users, end: true },
    // ];

    return (
        <section>
            <Sidebar collapsible="icon" {...props} className="pt-[60px]">
                <SidebarTrigger size={'lg'} className="text-[#6B6B6B] !size-10 self-end m-1" />

                <SidebarContent>
                    <SidebarMenu className="px-2">
                        {items.map((item, i) => (
                            <SidebarMenuItem key={i}>
                                <NavLink
                                    to={item?.url as string}
                                    end={item?.end}
                                    className={({ isActive }) =>
                                        `w-full ${isActive ? 'bg-white text-primary' : 'text-[#797979]'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <SidebarMenuButton
                                            size="lg"
                                            tooltip={item?.title}
                                            className={`w-full hover:text-primary  ${isActive ? '!bg-muted !text-primary shadow-sm' : ''
                                                }`}
                                        >
                                            <span className="!size-7 transition-colors pl-0.5">{item.icon}</span>
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
