import type { CloudinaryUploadResponse } from '@/components/FileUploader';
import SingleFileUploader from '@/components/FileUploader/SingleFileUploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { SelectBySearch } from '@/components/SelectBySearch';
import { useAllUsersQuery } from '@/redux/endpoints/userApi';
import { Switch } from '@/components/ui/switch';
import { useTeamCreateMutation } from '@/redux/endpoints/teamsApi';

const formSchema = z.object({
    teamName: z.string().min(2, 'Team name must be at least 2 characters'),
    teamDescription: z.string().min(10, 'Description must be at least 10 characters'),
    status: z.enum(['Active', 'Inactive']),
    teamLead: z.string().min(1, 'Please select a team lead'),
});

export default function AddTeams() {
    const [createTeam, { isLoading, isSuccess, isError }] = useTeamCreateMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: users, isFetching } = useAllUsersQuery({
        searchTerm: searchTerm || undefined,
        limit: 5,
    });

    const [uploadedFile, setUploadedFile] = useState<CloudinaryUploadResponse | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: '',
            teamDescription: '',
            status: 'Active',
            teamLead: '',
        },
    });

    const handleUploadSuccess = (uploaded: CloudinaryUploadResponse) => {
        setUploadedFile(uploaded);
        console.log('File uploaded successfully:', uploaded);
    };

    const handleDeleteSuccess = (publicId: string) => {
        setUploadedFile(null);
        console.log('File deleted successfully:', publicId);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!uploadedFile) {
            toast.error('Please upload a team logo');
            return;
        }

        const teamData = {
            ...values,
            teamlogo: uploadedFile.secure_url,
            publicId: uploadedFile.public_id,
        };

        try {
            await createTeam(teamData);
        } catch (error) {
            console.error('Error creating team:', error);
        }

        console.log('Form data to be submitted:', teamData);
        toast.success('Form data logged successfully! (Check console)');
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-6">Add New Team</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="teamName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">Team Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Product Avengers" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="teamLead"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">Team Lead</FormLabel>
                                    <FormControl>
                                        <SelectBySearch
                                            data={users?.data || []}
                                            isLoading={isFetching}
                                            displayKey="firstName"
                                            displayKey2="lastName"
                                            placeholder="Select team lead"
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
                            name="teamDescription"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-[#6B6B6B]">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Brief description of the team's purpose"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2 flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Team Status</FormLabel>
                                        <p className="text-sm text-muted-foreground">
                                            {field.value === 'Active'
                                                ? 'Team is currently active'
                                                : 'Team is currently inactive'}
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value === 'Active'}
                                            onCheckedChange={checked => {
                                                field.onChange(checked ? 'Active' : 'Inactive');
                                            }}
                                            className="cursor-pointer"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormItem className="md:col-span-2">
                            <FormLabel className="text-[#6B6B6B]">Team Logo</FormLabel>
                            <SingleFileUploader
                                folder="teams"
                                allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
                                fileData={uploadedFile}
                                onUploadSuccess={handleUploadSuccess}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                            {!uploadedFile && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    Recommended size: 500x500px, Max 5MB
                                </p>
                            )}
                        </FormItem>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                                form.reset();
                                setUploadedFile(null);
                            }}
                        >
                            Reset
                        </Button>
                        <Button className="flex-1" type="submit">
                            Create Team
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
