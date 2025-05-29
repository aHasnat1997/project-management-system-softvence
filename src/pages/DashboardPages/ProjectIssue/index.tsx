import { DataTable } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useAllProjectsIssuesQuery } from "@/redux/endpoints/projectIssueApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Trash, Upload } from "lucide-react";
import { useState } from "react";

export default function ProjectIssue() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsAssignedData, isLoading, isFetching } = useAllProjectsIssuesQuery({ page, limit, searchTerm });

  console.log(projectsAssignedData, isLoading, isFetching);


  type TIssue = {
    _id: string;
    issuesDate: string; // ISO date string, e.g., "2025-05-19"
    projectId: string | null;
    teamId: string | null;
    memberId: string | null;
    issueDate: string;
    note: string;
    status: 'NRI' | string; // Replace or extend as needed
    marketingProfileId: {
      _id: string;
      profileName: string;
      profileUsername: string;
      platform: string;
      profileUrl: string;
      status: 'Active' | string;
      addBy: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    createdAt: string;
    updatedAt: string;
  };


  const columns: ColumnDef<TIssue>[] = [
    {
      accessorKey: "issuesDate",
      header: "Issues Date",
      enableHiding: true
    },
    {
      accessorKey: "issueDate",
      header: "Issue Date",
      enableHiding: true
    },
    {
      accessorKey: "projectId",
      header: "Project Id",
      enableHiding: true
    },
    {
      accessorKey: "marketingProfileId",
      header: "Marketing Profile",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.marketingProfileId?.profileName}</span>
      ),
    },
    {
      accessorKey: "platform",
      header: "Platform",
      enableHiding: true,
      cell: ({ row }) => (
        <span>{row.original?.marketingProfileId?.platform}</span>
      ),
    }
  ];

  return (
    <section>
      <div className="mb-4">
        <Headers title="Project Issue">
          <div className="flex items-center gap-2">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <Button>
              <Plus /> Add Project Issue
            </Button>
          </div>
        </Headers>
      </div>

      <DataTable<TIssue>
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
