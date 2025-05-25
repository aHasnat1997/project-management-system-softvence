import { DataTable } from "@/components/DataTable/dataTable"
import DialogWrapper from "@/components/DialogContents"
// import FileUploader, { type CloudinaryUploadResponse } from "@/components/FileUploader"
import Headers from "@/components/Headers"
import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { useAllProjectsQuery } from "@/redux/endpoints/projectsApi"
import type { TProjectRes } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"
import { Filter, Plus } from "lucide-react"
import { useState } from "react"

export default function Project() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsData, isLoading, isFetching } = useAllProjectsQuery({ page, limit, searchTerm });
  // const [files, setFiles] = useState<CloudinaryUploadResponse[]>([]);

  // const handleUploadSuccess = (uploaded: CloudinaryUploadResponse[]) => {
  //   setFiles(uploaded);
  // };

  // const handleDeleteSuccess = (publicId: string) => {
  //   setFiles((prev) => prev.filter((file) => file.public_id !== publicId));
  // };

  const columns: ColumnDef<TProjectRes>[] = [
    {
      accessorKey: "clientName",
      header: "Client Name",
      enableHiding: true,
    },
    {
      accessorKey: "sellsBy",
      header: "Sells By",
      enableHiding: true
    },
    {
      accessorKey: "orderStartDate",
      header: "Start Date",
      enableHiding: true,
    },
    {
      accessorKey: "assignedBy",
      header: "Assigned By",
      enableHiding: true,
    },
    {
      accessorKey: "leadBy",
      header: "Lead By",
      enableHiding: true,
    },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      enableHiding: true,
    }
  ];

  return (
    <section>
      <Headers title="Project">
        <div className="flex items-center gap-2">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <Button variant="outline" className="hidden md:flex">
            <Filter /> Filter
          </Button>
          <DialogWrapper
            trigger={
              <Button>
                <Plus /> Add Project
              </Button>
            }
            content={<h1>Add Project</h1>}
          />
        </div>
      </Headers>

      <DataTable<TProjectRes>
        data={projectsData?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={projectsData?.meta?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      {/* <div>
        <FileUploader
          folder="my_uploads"
          allowedFormats={["image/*", "application/pdf"]}
          fileData={files}
          onUploadSuccess={handleUploadSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </div> */}
    </section>
  )
};
