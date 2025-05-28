import { DataTable } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useAllProjectsResourcesQuery } from "@/redux/endpoints/projectResourceApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Trash, Upload } from "lucide-react";
import { useState } from "react";

export default function ProjectResource() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsResourcesData, isLoading, isFetching } = useAllProjectsResourcesQuery({ page, limit, searchTerm });

  type TProjectsResources = {
    _id: string;
    resourceName: string;
    resource: string;
    note: string;
    projectId: string | null;
    addby: string | null;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };

  const columns: ColumnDef<TProjectsResources>[] = [
    {
      accessorKey: "projectId",
      header: "Project Id",
      enableHiding: true,
      cell: ({ row }) => {
        <span>{row.original.projectId ? row.original.projectId : 'N/A'}</span>
      },
    },
    {
      accessorKey: "resourceName",
      header: "Resource Name",
      enableHiding: true
    }
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Project Message">
          <div className="flex items-center gap-2">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <Button>
              <Plus /> Add Project Message
            </Button>
          </div>
        </Headers>
      </div>

      <DataTable<TProjectsResources>
        data={projectsResourcesData?.data?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={projectsResourcesData?.data.meta?.total}
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
