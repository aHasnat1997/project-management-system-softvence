import { DataTable } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import RegistrationContent from "@/components/DialogContents/registration";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useAllUsersQuery } from "@/redux/endpoints/userApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";

export default function Users() {
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
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.original.status === "ACTIVE"
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {row.original.status}
        </span>
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

      <DataTable
        data={mockEmployees}
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
