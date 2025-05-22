import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function TopBar() {
  const currentUser = useCurrentUser();

  return (
    <section className="w-full h-[60px] border-b-2 border-border flex items-center justify-between px-6">
      <div>
        <h1 className="lg:w-[180px] text-[24px] font-bold lg:text-center">
          Sof<span className="text-primary">t</span>vence
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div>
          {/* <img
            src={currentUser?.avatar}
            alt="avatar"
            className="size-[30px] rounded-full"
          /> */}
          <Avatar>
            <AvatarImage src={currentUser?.avatar} alt="avatar" />
            <AvatarFallback className="bg-primary text-white font-semibold">
              {currentUser?.firstName?.charAt(0)}
              {currentUser?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger><Bell /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>

            <DropdownMenuItem>No Notification for you</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  )
};
