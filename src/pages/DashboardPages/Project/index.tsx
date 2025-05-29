import { DataTable } from "@/components/DataTable/dataTable"
import DialogWrapper from "@/components/DialogContents"
import Headers from "@/components/Headers"
import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { useAllProjectsQuery } from "@/redux/endpoints/projectsApi"
import type { TProject } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"
import { Eye, Plus, Trash, Upload } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import DeleteProject from "./page/DeleteProject"
import ViewProject from "./page/ViewProject"

export default function Project() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsData, isLoading, isFetching } = useAllProjectsQuery({ page, limit, searchTerm });

  const columns: ColumnDef<TProject>[] = [
    {
      accessorKey: "clientName",
      header: "Client Name",
      enableHiding: true,
    },
    {
      accessorKey: "sellsByName",
      header: "Sells By",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.sellsBy?.firstName} {row.original?.sellsBy?.lastName}</span>
      ),
    },
    {
      accessorKey: "orderStartDate",
      header: "Start Date",
      enableHiding: true,
    },
    {
      accessorKey: "assignedByName",
      header: "Assigned By",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.assignedBy?.firstName} {row.original?.assignedBy?.lastName}</span>
      ),
    },
    {
      accessorKey: "leadByName",
      header: "Lead By",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.leadBy?.firstName} {row.original?.leadBy?.lastName}</span>
      ),
    },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      enableHiding: true,
    }
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Project">
          <div className="flex items-center gap-2">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            {/* <Button variant="outline" className="hidden md:flex">
              <Filter /> Filter
            </Button> */}
            <Button
              onClick={() => navigate('/dashboard/projects/add-project')}
            >
              <Plus /> Add Project
            </Button>
          </div>
        </Headers>
      </div>

      <DataTable<TProject>
        data={projectsData?.data?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={projectsData?.data.meta?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        actions={(row) => (
          <div className="px-2 flex items-center gap-2">
            <DialogWrapper
              trigger={
                <Eye className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<ViewProject projectId={row._id} />}
            />
            <DialogWrapper
              trigger={
                <Upload className="duration-150 hover:text-primary text-muted-foreground" />
              }
              content={<></>}
            />
            <DialogWrapper
              trigger={
                <Trash className="duration-150 text-red-600 hover:text-primary" />
              }
              content={<DeleteProject projectId={row._id} />}
            />
          </div>
        )}
      />
    </section>
  )
};
