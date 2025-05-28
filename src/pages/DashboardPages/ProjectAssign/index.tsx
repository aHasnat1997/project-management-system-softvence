import { DataTable } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useAllProjectsAssignedPersonQuery } from "@/redux/endpoints/projectAssignedPersonApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Trash, Upload } from "lucide-react";
import { useState } from "react";

export default function ProjectAssign() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsAssignedData, isLoading, isFetching } = useAllProjectsAssignedPersonQuery({ page, limit, searchTerm });

  type TProjectAssignedPersons = {
    projectId: string,
    assignedMembers: [],
    teams: [],
    role: string,
    createdAt: string,
    updatedAt: string
  }

  const columns: ColumnDef<TProjectAssignedPersons>[] = [
    {
      accessorKey: "projectId",
      header: "Project Id",
      enableHiding: true,
      cell: ({ row }) => {
        <span>{row.original.projectId ? row.original.projectId : 'N/A'}</span>
      },
    },
    {
      accessorKey: "assignedMembers",
      header: "Assigned Members",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.assignedMembers?.length}</span>
      ),
    },
    {
      accessorKey: "teams",
      header: "Teams",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.teams?.length}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      enableHiding: true,
    }
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Assigned Project">
          <div className="flex items-center gap-2">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <Button>
              <Plus /> Assign Project
            </Button>
          </div>
        </Headers>
      </div>

      <DataTable<TProjectAssignedPersons>
        data={projectsAssignedData?.data?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={projectsAssignedData?.data.meta?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        actions={() => (
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
                <Trash className="duration-150 text-red-600 hover:text-primary" />
              }
              content={<></>}
            />
          </div>
        )}
      />

    </section>
  );
};
