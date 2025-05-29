import { DataTable } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import RegistrationContent from "./page/registration";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAllUsersQuery, useUserUpdateMutation } from "@/redux/endpoints/userApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import UserDetails from "./page/UserDetails";
import type { TEmployee } from "@/types";
import UpdateDetails from "./page/UpdateDetails";
import DeleteUser from "./page/DeleteUser";

export default function UsersProfile() {
  // const tableRef = useRef<DataTableHandle<any>>(null)
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { data: usersData, isLoading, isFetching } = useAllUsersQuery({ page, limit, searchTerm });
  const [userUpdate, { isLoading: isUpdateLoading }] = useUserUpdateMutation();

  const handleUserStatusChange = async (userId: string, currentStatus: "Active" | "Deactivate") => {
    const newStatus = currentStatus === "Active" ? "Deactivate" : "Active";
    // Create FormData
    const data = {
      userStatus: newStatus
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      await userUpdate({ id: userId, data: formData }).unwrap();
      // Optionally, you can show a success message or update the UI accordingly
    } catch (error) {
      console.error("Failed to update user status:", error);
      // Optionally, you can show an error message
    }
  }

  const columns: ColumnDef<TEmployee>[] = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      enableHiding: true,
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={row?.original?.avatar} alt="avatar" />
          <AvatarFallback className="bg-primary text-white font-semibold">
            {row?.original?.firstName?.charAt(0)}
            {row?.original?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      enableHiding: true,
      cell: ({ row }) => (
        <p>{row?.original?.firstName} {row?.original?.lastName}</p>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      enableHiding: true,
    },
    {
      accessorKey: "designation",
      header: "Designation",
      enableHiding: true,
    },
    {
      accessorKey: "userStatus",
      header: "Status",
      enableHiding: true,
      cell: ({ row }) => {
        return <div>
          <Switch
            defaultChecked={row.original.userStatus === "Active" ? true : false}
            onCheckedChange={() => handleUserStatusChange(row.original?._id, row.original?.userStatus)}
            disabled={isUpdateLoading}
          />
        </div>
      },
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Marketing Profile">
          <div className="flex items-center gap-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
            />

            <DialogWrapper
              trigger={
                <Button>
                  <Plus /> Add Users
                </Button>
              }
              content={<RegistrationContent />}
            />
          </div>
        </Headers>
      </div>

      <DataTable<TEmployee>
        data={usersData?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={usersData?.meta?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        actions={(row) => (
          <div className="px-2 flex items-center gap-2">
            <DialogWrapper
              trigger={
                <Eye className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<UserDetails userId={row._id} />}
            />
            <DialogWrapper
              trigger={
                <SquarePen className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<UpdateDetails userData={row} />}
            />
            <DialogWrapper
              trigger={
                <Trash className="duration-150 text-red-600 hover:text-primary" />
              }
              content={<DeleteUser userId={row._id} />}
            />
          </div>
        )}
      // columnFilters={columnFilters}
      // setColumnFilters={setColumnFilters}
      // columnVisibility={columnVisibility}
      // setColumnVisibility={setColumnVisibility}
      />
    </section>
  );
};
