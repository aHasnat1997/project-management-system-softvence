import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

const formSchema = z.object({
    userId: z.string().min(8, 'User ID must be at least 8 characters'),
    memberType: z.enum(['Upwork', 'Internal', 'Contractor']),
    teamId: z.string().min(6, 'Team ID must be at least 6 characters'),
    status: z.boolean(),
});

export default function Addmember() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: '',
            memberType: undefined,
            teamId: '',
            status: true,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log('Form submitted:', {
                ...values,
                status: values.status ? 'Active' : 'Inactive',
            });
            toast.success('Member added successfully!');
            form.reset();
        } catch (err) {
            console.error('Submission failed:', err);
            toast.error('Failed to add member.');
        }
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">User ID</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="off"
                                        placeholder="Enter user ID (min 8 chars)"
                                        onChange={e => {
                                            // Only allow numbers
                                            const value = e.target.value.replace(/\D/g, '');
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="memberType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Member Type</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select member type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Upwork">Upwork</SelectItem>
                                        <SelectItem value="Internal">Internal</SelectItem>
                                        <SelectItem value="Contractor">Contractor</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="teamId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Team ID</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="off"
                                        placeholder="Enter team ID (min 6 chars)"
                                        onChange={e => {
                                            // Only allow numbers
                                            const value = e.target.value.replace(/\D/g, '');
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex items-end justify-between gap-4 pt-4">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-[#6B6B6B] mb-2">Status</FormLabel>
                                    <div className="flex items-center gap-3">
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <span>{field.value ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() =>
                                    form.reset({
                                        userId: '',
                                        memberType: undefined,
                                        teamId: '',
                                        status: true,
                                    })
                                }
                            >
                                Reset
                            </Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    );
}
