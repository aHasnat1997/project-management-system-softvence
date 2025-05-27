import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { SelectBySearch } from '@/components/SelectBySearch';
import { useAllUsersQuery } from '@/redux/endpoints/userApi';
import { useTeamMembersCreateMutation } from '@/redux/endpoints/teamMembersApi';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAllTeamsQuery } from '@/redux/endpoints/teamsApi';

const formSchema = z.object({
    userId: z.string().min(1, 'Please select a user'),
    teamId: z.string().min(1, 'Please select a team'),
    memberType: z.enum(['member', 'lead']),
    status: z.enum(['active', 'inactive']),
});

type ApiError = {
    status: number;
    data: {
        errorSources?: Array<{
            path: string;
            message: string;
        }>;
        message?: string;
    };
};

type AddMemberProps = {
    onSuccess?: () => void;
};

export default function AddMember({ onSuccess }: AddMemberProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [addTeamMember, { isLoading }] = useTeamMembersCreateMutation();

    const { data: users, isFetching } = useAllUsersQuery({
        searchTerm: searchTerm || undefined,
        limit: 5,
    });

    const { data: teams, isFetching: isFetchingTeams } = useAllTeamsQuery({
        searchTerm: searchTerm || undefined,
        limit: 5,
    });

    console.log(teams);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: '',
            teamId: '',
            memberType: 'member',
            status: 'active',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await addTeamMember({
                userId: values.userId,
                teamId: values.teamId,
                memberType: values.memberType,
                status: values.status,
            }).unwrap();

            toast.success('Member added successfully!');
            form.reset();
            onSuccess?.();
        } catch (error: unknown) {
            const apiError = error as ApiError;

            if (apiError?.data?.errorSources) {
                apiError.data.errorSources.forEach(errorSource => {
                    if (Object.keys(formSchema.shape).includes(errorSource.path)) {
                        form.setError(errorSource.path as keyof z.infer<typeof formSchema>, {
                            type: 'manual',
                            message: errorSource.message,
                        });
                    } else {
                        toast.error(errorSource.message);
                    }
                });
            } else if (apiError?.data?.message) {
                toast.error(apiError.data.message);
            } else {
                toast.error('An unexpected error occurred while adding the member');
                console.error('Error adding team member:', error);
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-6">Add New Member</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#6B6B6B]">User</FormLabel>
                                        <FormControl>
                                            <SelectBySearch
                                                data={users?.data || []}
                                                isLoading={isFetching}
                                                displayKey="firstName"
                                                displayKey2="lastName"
                                                placeholder="Select user"
                                                searchPlaceholder="Search users..."
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                onSearchChange={setSearchTerm}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#6B6B6B]"> Team</FormLabel>
                                        <FormControl>
                                            <SelectBySearch
                                                data={teams?.data?.data || []}
                                                isLoading={isFetchingTeams}
                                                displayKey="teamName"
                                                placeholder="Select team"
                                                searchPlaceholder="Search teams..."
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                onSearchChange={setSearchTerm}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="memberType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#6B6B6B]">
                                            Member Type
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select member type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="member">Member</SelectItem>
                                                <SelectItem value="lead">Lead</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#6B6B6B]">Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => form.reset()}
                        >
                            Reset
                        </Button>
                        <Button className="flex-1" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader className="mr-2 animate-spin" /> : 'Add Member'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
