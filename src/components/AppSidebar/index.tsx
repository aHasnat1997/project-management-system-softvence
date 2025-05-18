import {
  ClipboardCheck,
  LayoutGrid,
  NotepadText,
  Settings,
  SquarePen,
  UserRound,
  Users,
  UsersRound
} from "lucide-react";
import { Link } from "react-router";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutGrid,
  },
  {
    title: "Member",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "User",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Project",
    url: "#",
    icon: NotepadText,
  },
  {
    title: "Team",
    url: "#",
    icon: Users,
  },
  {
    title: "Assignment",
    url: "#",
    icon: SquarePen,
  },
  {
    title: "Project Resource",
    url: "#",
    icon: ClipboardCheck,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <section className="w-[250px] border-r-2 border-border">
      <div className="w-full h-[60px] border-b-2 border-border flex items-center justify-center">
        <h1 className=" text-[24px] font-bold">
          Sof<span className="text-primary">t</span>vence
        </h1>
      </div>

      <ul className="w-full px-2 mt-8">
        {
          items.map((item, i) => <li key={i} className="w-full px-4 py-2 cursor-pointer group hover:bg-[#EBEBED]">
            <Link to={item.url} className="flex items-center gap-2">
              <item.icon className="size-[20px] text-[#6B6B6B] group-hover:text-black" />
              <h4 className="text-[#6B6B6B] group-hover:text-black">{item.title}</h4>
            </Link>
          </li>)
        }
      </ul>
    </section>
  )
}
