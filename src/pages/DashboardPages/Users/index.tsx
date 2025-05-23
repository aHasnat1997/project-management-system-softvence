import ColumnsFilter from "@/components/DataTable/columnsFiltter";
import { DataTable, type DataTableHandle } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import RegistrationContent from "@/components/DialogContents/registration";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAllUsersQuery } from "@/redux/endpoints/userApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function Users() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableRef = useRef<DataTableHandle<any>>(null)
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: clientData } = useAllUsersQuery({ page, limit });

  console.log(clientData);

  type Employee = {
    id: number
    name: string
    email: string
    department: string
    status: "ACTIVE" | "INACTIVE"
  };
  const mockEmployees: Employee[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      department: "Engineering",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      department: "Marketing",
      status: "INACTIVE",
    },
    {
      id: 3,
      name: "Carol Lee",
      email: "carol@example.com",
      department: "HR",
      status: "ACTIVE",
    },
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      department: "Engineering",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      department: "Marketing",
      status: "INACTIVE",
    },
    {
      id: 3,
      name: "Carol Lee",
      email: "carol@example.com",
      department: "HR",
      status: "ACTIVE",
    },
  ];

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: true,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableHiding: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableHiding: true,
      cell: ({ row }) => (
        <Switch checked={row.original.status === "ACTIVE" ? true : false} />
      ),
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Users">
          <div className="flex items-center gap-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
            />

            <Button variant="outline" className="hidden md:flex">
              <Eye /> View All
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

      <DataTable<Employee>
        data={mockEmployees}
        ref={tableRef}
        columns={columns}
        isLoading={false}
        page={page}
        limit={limit}
        total={mockEmployees.length}
        onPageChange={setPage}
        onLimitChange={setLimit}
        actions={() => (
          <span className="px-2">
            <Eye />
          </span>
        )}
      />
    </section>
  );
};
