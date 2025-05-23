import ColumnsFilter from "@/components/DataTable/columnsFilter";
import { DataTable, type DataTableHandle } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import RegistrationContent from "@/components/DialogContents/registration";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAllUsersQuery } from "@/redux/endpoints/userApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Filter, Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function MarketingProfile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableRef = useRef<DataTableHandle<any>>(null)
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: clientData, isLoading, isFetching } = useAllUsersQuery({ page, limit });

  type TEmployee = {
    _id: string
    avatar: string
    createdAt: string
    updatedAt: string
    designation: string
    email: string
    employeeId: string
    firstName: string
    lastName: string
    userName: string
    phoneNumber: string
    role: string
    userStatus: "Active" | "Inactive"
    isBlocked: boolean
    isDeleted: boolean
    isPasswordChanged: boolean
  };

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
      cell: ({ row }) => (
        <Switch checked={row.original.userStatus === "Active" ? true : false} />
      ),
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

            <Button variant="outline" className="hidden md:flex">
              <Filter /> Filter
            </Button>

            <div>
              <ColumnsFilter tableRef={tableRef} />
            </div>

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
        data={clientData?.data}
        ref={tableRef}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={clientData?.meta?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        actions={() => (
          <span className="px-2">
            <Eye className="text-primary" />
          </span>
        )}
      />
    </section>
  );
};
