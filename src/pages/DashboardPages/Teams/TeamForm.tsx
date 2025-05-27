import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

import type { CloudinaryUploadResponse } from '@/components/FileUploader';
import SingleFileUploader from '@/components/FileUploader/SingleFileUploader';
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
import { Textarea } from '@/components/ui/textarea';
import { SelectBySearch } from '@/components/SelectBySearch';
import { Switch } from '@/components/ui/switch';
import { useAllUsersQuery, useSingleUsersQuery } from '@/redux/endpoints/userApi';
import { useTeamCreateMutation, useTeamUpdateMutation } from '@/redux/endpoints/teamsApi';

const formSchema = z.object({
    teamName: z.string().min(2, 'Team name must be at least 2 characters'),
    teamDescription: z.string().min(10, 'Description must be at least 10 characters'),
    status: z.enum(['Active', 'Deactivate']),
    teamLead: z.string().min(1, 'Please select a team lead'),
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

type TeamFormProps = {
    mode?: 'create' | 'edit';
    initialValues?: Partial<z.infer<typeof formSchema>> & {
        teamlogo?: string;
        publicId?: string;
    };
    teamSlug?: string;
    onSuccess?: () => void;
};

export default function TeamForm({
    mode = 'create',
    initialValues,
    teamSlug,
    onSuccess,
}: TeamFormProps) {
    const [uploadedFile, setUploadedFile] = useState<CloudinaryUploadResponse | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [createTeam, { isLoading: isCreating }] = useTeamCreateMutation();
    const [updateTeam, { isLoading: isUpdating }] = useTeamUpdateMutation();

    const { data: users, isFetching } = useAllUsersQuery({
        searchTerm: searchTerm || undefined,
        limit: 5,
    });

    const { data: teamLeadData, isLoading: isTeamLeadLoading } = useSingleUsersQuery(
        initialValues?.teamLead || '',
        {
            skip: !initialValues?.teamLead || mode !== 'edit',
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: initialValues?.teamName || '',
            teamDescription: initialValues?.teamDescription || '',
            status: initialValues?.status || 'Active',
            teamLead: initialValues?.teamLead || '',
        },
    });

    // Initialize form with team lead when data loads
    useEffect(() => {
        if (mode === 'edit' && initialValues?.teamLead && teamLeadData?.data) {
            form.setValue('teamLead', initialValues.teamLead);
        }
    }, [mode, initialValues, teamLeadData, form]);

    // Initialize file upload state
    useEffect(() => {
        if (mode === 'edit' && initialValues?.teamlogo) {
            setUploadedFile({
                secure_url: initialValues.teamlogo,
                public_id: initialValues.publicId || '',
            } as CloudinaryUploadResponse);
        }
    }, [mode, initialValues]);

    const handleUploadSuccess = useCallback((uploaded: CloudinaryUploadResponse) => {
        setUploadedFile(uploaded);
    }, []);

    const handleDeleteSuccess = useCallback(() => {
        setUploadedFile(null);
    }, []);

    const resetForm = useCallback(() => {
        form.reset({
            teamName: initialValues?.teamName || '',
            teamDescription: initialValues?.teamDescription || '',
            status: initialValues?.status || 'Active',
            teamLead: initialValues?.teamLead || '',
        });

        if (mode === 'create') {
            setUploadedFile(null);
        } else if (initialValues?.teamlogo) {
            setUploadedFile({
                secure_url: initialValues.teamlogo,
                public_id: initialValues.publicId || '',
            } as CloudinaryUploadResponse);
        }
    }, [form, initialValues, mode]);

    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            try {
                if (!uploadedFile) {
                    toast.error('Please upload a team logo');
                    return;
                }

                const teamData = {
                    ...values,
                    teamlogo: uploadedFile.secure_url,
                    publicId: uploadedFile.public_id,
                };

                if (mode === 'create') {
                    await createTeam(teamData).unwrap();
                    toast.success('Team created successfully!');
                    resetForm();
                } else if (mode === 'edit' && teamSlug) {
                    await updateTeam({
                        slug: teamSlug,
                        data: {
                            teamName: values.teamName,
                            teamDescription: values.teamDescription,
                            status: values.status,
                            teamLead: values.teamLead,
                            teamlogo: uploadedFile?.secure_url,
                            publicId: uploadedFile?.public_id,
                        },
                    }).unwrap();
                    console.log({
                        teamName: values.teamName,
                        teamDescription: values.teamDescription,
                        status: values.status,
                        teamLead: values.teamLead,
                        teamlogo: uploadedFile?.secure_url,
                        publicId: uploadedFile?.public_id,
                    });

                    toast.success('Team updated successfully!');
                }

                onSuccess?.();
            } catch (error: unknown) {
                const apiError = error as ApiError;

                if (apiError?.data?.errorSources) {
                    apiError.data.errorSources.forEach(errorSource => {
                        const fieldName =
                            errorSource.path === 'slug' ? 'teamName' : errorSource.path;

                        if (Object.keys(formSchema.shape).includes(fieldName)) {
                            form.setError(fieldName as keyof z.infer<typeof formSchema>, {
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
                    toast.error(
                        `An unexpected error occurred while ${
                            mode === 'create' ? 'creating' : 'updating'
                        } the team`
                    );
                    console.error(
                        `Error ${mode === 'create' ? 'creating' : 'updating'} team:`,
                        error
                    );
                }
            }
        },
        [createTeam, updateTeam, uploadedFile, resetForm, form, mode, teamSlug, onSuccess]
    );

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-6">
                {mode === 'create' ? 'Add New Team' : 'Edit Team'}
            </h2>

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
                                        <Input
                                            {...field}
                                            placeholder="Product Avengers"
                                            onChange={e => {
                                                field.onChange(e);
                                                if (
                                                    form.formState.errors.teamName?.type ===
                                                    'manual'
                                                ) {
                                                    form.clearErrors('teamName');
                                                }
                                            }}
                                        />
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
                                            isLoading={isFetching || isTeamLeadLoading}
                                            displayKey="firstName"
                                            displayKey2="lastName"
                                            placeholder="Select team lead"
                                            searchPlaceholder="Search users..."
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            onSearchChange={setSearchTerm}
                                            initialSelectedItem={teamLeadData?.data}
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
                                            rows={4}
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
                                                : 'Team is currently deactive'}
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value === 'Active'}
                                            onCheckedChange={checked =>
                                                field.onChange(checked ? 'Active' : 'Deactivate')
                                            }
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
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                        <Button
                            className="flex-1"
                            type="submit"
                            disabled={isCreating || isUpdating}
                        >
                            {isCreating || isUpdating ? (
                                <Loader className="mr-2 animate-spin" />
                            ) : mode === 'create' ? (
                                'Create Team'
                            ) : (
                                'Update Team'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
