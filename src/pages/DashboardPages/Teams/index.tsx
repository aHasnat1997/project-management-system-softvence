import { useState } from 'react';
import { DataTable } from '@/components/DataTable/dataTable';
import DialogWrapper from '@/components/DialogContents';
import Headers from '@/components/Headers';
import SearchInput from '@/components/SearchInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Filter, Plus } from 'lucide-react';
import { useAllTeamsQuery } from '@/redux/endpoints/teamsApi';
import type { TTeam } from '@/types/teams.type';
import TeamForm from './TeamForm';

export default function Teams() {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(15);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const {
        data: teamsData,
        isLoading,
        isFetching,
    } = useAllTeamsQuery({ page, limit, searchTerm });

    const columns: ColumnDef<TTeam>[] = [
        {
            accessorKey: 'teamlogo',
            header: 'Logo',
            cell: ({ row }) => (
                <Avatar>
                    <AvatarImage src={row.original.teamlogo} alt="team-logo" />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                        {row.original.teamName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorKey: 'teamName',
            header: 'Team Name',
        },
        {
            accessorKey: 'teamLead',
            header: 'Team Lead',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.original.teamLead?.avatar} />
                        <AvatarFallback>
                            {row.original.teamLead?.firstName?.charAt(0)}
                            {row.original.teamLead?.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span>
                        {row.original.teamLead?.firstName} {row.original.teamLead?.lastName}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: 'assignProjectCount',
            header: 'Projects',
            cell: ({ row }) => (
                <span>
                    {row.original.assignProjectCount} assigned /{' '}
                    {row.original.completedProjectCount} completed
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <span
                    className={`${
                        row.original.status === 'Active' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {row.original.status === 'Active' ? 'Active' : 'Deactive'}
                </span>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <section>
            <div className="mb-4">
                <Headers title="Teams Management">
                    <div className="flex items-center gap-2">
                        <SearchInput
                            value={searchTerm}
                            onChange={value => {
                                setSearchTerm(value);
                                setPage(1);
                            }}
                        />

                        <Button variant="outline" className="hidden md:flex">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>

                        <DialogWrapper
                            trigger={
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Team
                                </Button>
                            }
                            content={<TeamForm mode="create" onSuccess={() => {}} />}
                        />
                    </div>
                </Headers>
            </div>

            <DataTable<TTeam>
                data={teamsData?.data?.data || []}
                columns={columns}
                isLoading={isLoading || isFetching}
                page={page}
                limit={limit}
                total={teamsData?.data?.meta?.total || 0}
                onPageChange={setPage}
                onLimitChange={setLimit}
                actions={({ teamName, teamDescription, status, teamLead, teamlogo, slug }) => (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            // Handle view team details
                            // console.log('View team:', row.original);
                        }}
                    >
                        <DialogWrapper
                            trigger={
                                <Button>
                                    <Edit />
                                </Button>
                            }
                            content={
                                <TeamForm
                                    mode="edit"
                                    initialValues={{
                                        teamName: teamName || '',
                                        teamDescription: teamDescription || '',
                                        status: status,
                                        teamLead: teamLead?._id || '',
                                        teamlogo: teamlogo || '',
                                        publicId: 'folder/image',
                                    }}
                                    teamSlug={slug}
                                    onSuccess={() => {}}
                                />
                            }
                        />
                    </Button>
                )}
            />
        </section>
    );
}
