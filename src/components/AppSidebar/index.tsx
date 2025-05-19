import {
  CircleChevronUp,
  ClipboardCheck,
  LayoutGrid,
  NotepadText,
  Settings,
  SquarePen,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

// Menu items.
const items = [
  { title: "Dashboard", url: "#", icon: LayoutGrid },
  { title: "Member", url: "#", icon: UsersRound },
  { title: "User", url: "#", icon: UserRound },
  { title: "Project", url: "#", icon: NotepadText },
  { title: "Team", url: "#", icon: Users },
  { title: "Assignment", url: "#", icon: SquarePen },
  { title: "Project Resource", url: "#", icon: ClipboardCheck },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
      className={`border-r-2 z-40 bg-white border-border absolute lg:relative duration-500 h-[calc(100vh-60px)] ${isOpen ? "w-[250px]" : "w-0"
        }`}
    >
      {/* Toggle Button */}
      <button
        className={`absolute z-50 top-2 cursor-pointer duration-500 ${isOpen ? "-rotate-90 -right-4" : "rotate-90 -right-8"
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CircleChevronUp className="bg-white rounded-full text-[#a8a8a8] size-8 duration-200 hover:text-primary" />
      </button>

      {/* Sidebar content */}
      <ul
        className={`px-2 mt-8 duration-500 ${isOpen ? "w-full block" : "w-0 hidden"
          }`}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="w-full px-4 py-2 cursor-pointer group hover:bg-[#EBEBED]"
          >
            <Link to={item.url} className="flex items-center gap-2">
              <item.icon className="size-[20px] text-[#6B6B6B] group-hover:text-black" />
              <h4 className="text-[#6B6B6B] text-nowrap group-hover:text-black">
                {item.title}
              </h4>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
