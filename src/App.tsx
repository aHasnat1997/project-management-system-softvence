import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./components/DataTable/dataTable"
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import RegistrationContent from "./components/DialogContents/registration"

export default function App() {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  type Employee = {
    id: number
    name: string
    email: string
    department: string
    status: "ACTIVE" | "INACTIVE"
  }
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
    <>
      <h1 className="text-8xl font-semibold border-2 border-border pb-4">Project Management System</h1>

      <div className="m-6">
        <Dialog>
          <DialogTrigger>
            <Button>Open</Button>
          </DialogTrigger>
          <DialogContent>
            <RegistrationContent />
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-6">
        <DataTable
          data={mockEmployees}
          columns={columns}
          isLoading={false}
          filterColumn="email"
          page={page}
          limit={limit}
          total={mockEmployees.length}
          onPageChange={setPage}
          onLimitChange={setLimit}
          actions={() => (
            <div className="flex gap-2">
              <button className="text-blue-600 hover:underline">View</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          )}
        />
      </div>
    </>
  )
}

