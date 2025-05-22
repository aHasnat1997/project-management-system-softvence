import {
  ClipboardCheck,
  LayoutGrid,
  LogOut,
  NotepadText,
  PanelRight,
  Settings,
  SquarePen,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import TooltipWrapper from "../TooltipWrapper";

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

export function AppSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // Tailwind's `lg` breakpoint
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open on desktop, closed on mobile
    };

    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on outside click only for mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobile, isOpen]);

  return (
    <section
      ref={sidebarRef}
      className={`flex flex-col gap-2 border-r-2 z-40 bg-white border-border absolute lg:relative duration-1000 h-[calc(100vh-60px)] ${isOpen ? "w-64 py-4" : "w-[60px] py-4"}`}
    >
      {/* Toggle Button */}
      <button
        className={`cursor-pointer text-[#6B6B6B] mb-4 ${isOpen ? 'ml-auto px-4' : 'mx-auto'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <PanelRight />
      </button>

      {/* Sidebar content */}
      <ul className="px-2">
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex items-center gap-4 group hover:bg-[#EBEBED] ${isOpen ? "" : "rounded-full"}`}
          >
            <NavLink
              to={item.url}
              end={item.end}
              className={({ isActive }) =>
                `w-full ${isActive ? `bg-[#EBEBED] text-primary ${isOpen ? '' : 'rounded-full'}` : "text-[#6B6B6B]"}`
              }
            >
              <div className={` flex items-center gap-4 w-full ${isOpen ? "px-4 py-2" : "p-2 rounded-full"}`}>
                {
                  isOpen ? (
                    <item.icon className="group-hover:text-primary transition-colors" />
                  ) : (
                    <TooltipWrapper
                      trigger={<item.icon className="group-hover:text-primary transition-colors cursor-pointer" />}
                      content={item.title}
                    />
                  )
                }
                <h4
                  className={`text-nowrap group-hover:text-primary duration-300 ${isOpen ? "scale-100 block" : "scale-0 hidden"
                    }`}
                >
                  {item.title}
                </h4>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>


      <Button
        variant='ghost'
        className="mt-auto"
        onClick={() => {
          localStorage.removeItem('persist:userInfo')
          navigate("/login", { replace: true })
        }}
      >
        {
          isOpen ? (
            <><LogOut /> <span className={isOpen ? "w-full block" : "w-0 hidden"}>Log Out</span></>
          ) : (
            <TooltipWrapper
              trigger={<LogOut className="cursor-pointer" />}
              content={'Log Out'}
            />
          )
        }

      </Button>
    </section>
  );
}
