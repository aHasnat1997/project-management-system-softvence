import { DataTable } from "@/components/DataTable/dataTable"
import RegistrationContent from "@/components/DialogContents/registration"
import FileUploader, { type CloudinaryUploadResponse } from "@/components/FileUploader"
import Headers from "@/components/Headers"
import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { ColumnDef } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [files, setFiles] = useState<CloudinaryUploadResponse[]>([]);

  const handleUploadSuccess = (uploaded: CloudinaryUploadResponse[]) => {
    setFiles(uploaded);
  };

  const handleDeleteSuccess = (publicId: string) => {
    setFiles((prev) => prev.filter((file) => file.public_id !== publicId));
  };

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
    <>
      <Headers title="Dashboard">
        <div className="flex items-center gap-2">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <RegistrationContent />
            </DialogContent>
          </Dialog>
        </div>
      </Headers>

      <div>
        <FileUploader
          folder="my_uploads"
          allowedFormats={["image/*", "application/pdf"]}
          fileData={files}
          onUploadSuccess={handleUploadSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </div>

      <div>
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
};
