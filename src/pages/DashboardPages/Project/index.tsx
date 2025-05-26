import { DataTable } from "@/components/DataTable/dataTable"
import DialogWrapper from "@/components/DialogContents"
// import FileUploader, { type CloudinaryUploadResponse } from "@/components/FileUploader"
import Headers from "@/components/Headers"
import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { useAllProjectsQuery } from "@/redux/endpoints/projectsApi"
import type { TProject } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"
import { Eye, Filter, Plus, Trash, Upload } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Project() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsData, isLoading, isFetching } = useAllProjectsQuery({ page, limit, searchTerm });

  console.log("projectsData", projectsData)


  // const [files, setFiles] = useState<CloudinaryUploadResponse[]>([]);

  // const handleUploadSuccess = (uploaded: CloudinaryUploadResponse[]) => {
  //   setFiles(uploaded);
  // };

  // const handleDeleteSuccess = (publicId: string) => {
  //   setFiles((prev) => prev.filter((file) => file.public_id !== publicId));
  // };

  const columns: ColumnDef<TProject>[] = [
    {
      accessorKey: "clientName",
      header: "Client Name",
      enableHiding: true,
    },
    // {
    //   accessorKey: "sellsBy",
    //   header: "Sells By",
    //   enableHiding: true
    // },
    // {
    //   accessorKey: "orderStartDate",
    //   header: "Start Date",
    //   enableHiding: true,
    // },
    // {
    //   accessorKey: "assignedBy",
    //   header: "Assigned By",
    //   enableHiding: true,
    // },
    // {
    //   accessorKey: "leadBy",
    //   header: "Lead By",
    //   enableHiding: true,
    // },
    // {
    //   accessorKey: "deliveryDate",
    //   header: "Delivery Date",
    //   enableHiding: true,
    // }
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Project">
          <div className="flex items-center gap-2">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <Button variant="outline" className="hidden md:flex">
              <Filter /> Filter
            </Button>
            <Button
              onClick={() => { navigate('/dashboard/projects/add-project') }}
            >
              <Plus /> Add Project
            </Button>
          </div>
        </Headers>
      </div>

      <DataTable<TProject>
        data={projectsData?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={projectsData?.meta?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        actions={(row) => (
          <div className="px-2 flex items-center gap-2">
            <DialogWrapper
              trigger={
                <Eye className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<></>}
            />
            <DialogWrapper
              trigger={
                <Upload className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<></>}
            />
            <DialogWrapper
              trigger={
                <Trash className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<></>}
            />
          </div>
        )}
      />
    </section>
  )
};
