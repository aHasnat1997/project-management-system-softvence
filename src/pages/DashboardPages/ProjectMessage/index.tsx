import { DataTable } from "@/components/DataTable/dataTable";
import DialogWrapper from "@/components/DialogContents";
import Headers from "@/components/Headers";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useAllProjectsMessageQuery } from "@/redux/endpoints/projectsMessagesApi";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Trash, Upload } from "lucide-react";
import { useState } from "react";

export default function ProjectMessage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: projectsMessageData, isLoading, isFetching } = useAllProjectsMessageQuery({ page, limit, searchTerm });

  type TProjectsMessage = {
    _id: string;
    projectId: string;
    messageType: string; // Consider narrowing this to a union if the values are fixed (e.g., 'Follow Up')
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
    message: string;
    note: string;
    messageStatus: 'delivered' | string; // Extend with more statuses if needed
    issueId: {
      _id: string;
      issuesDate: string;
      projectId: string;
      teamId: string;
      memberId: string;
      issueDate: string;
      note: string;
      status: 'NRI' | string;
      marketingProfileId: string; // Just an ID reference here
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    messageBy: string | null;
    createdAt: string;
    updatedAt: string;
  };

  const columns: ColumnDef<TProjectsMessage>[] = [
    {
      accessorKey: "projectId",
      header: "Project Id",
      enableHiding: true,
      cell: ({ row }) => {
        <span>{row.original.projectId ? row.original.projectId : 'N/A'}</span>
      },
    },
    {
      accessorKey: "messageType",
      header: "Message Type",
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
      accessorKey: "messageStatus",
      header: "Message Status",
      enableHiding: true,
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

      <DataTable<TProjectsMessage>
        data={projectsMessageData?.data?.data}
        columns={columns}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={projectsMessageData?.data.meta?.total}
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
