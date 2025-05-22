import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Switch } from '../ui/switch';

const formSchema = z.object({
    profileName: z.string().min(2),
    platform: z.string().min(2),
    status: z.boolean(),
    username: z.string().min(2),
    addedBy: z.string().min(2),
});

export default function AddMarketingProfile() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            profileName: '',
            platform: '',
            status: true,
            username: '',
            addedBy: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log('Form submitted:', {
                ...values,
                status: values.status ? 'Active' : 'Inactive',
            });
            toast.success('Profile saved successfully!');
            form.reset();
        } catch (err) {
            console.error('Submission failed:', err);
            toast.error('Failed to save profile.');
        }
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                    <FormField
                        control={form.control}
                        name="profileName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Profile Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="off"
                                        placeholder="Delowar Hossain"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Platform</FormLabel>
                                <FormControl>
                                    <Input {...field} autoComplete="off" placeholder="Upwork" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Profile Username</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="off"
                                        placeholder="delowarhossain"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="addedBy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Add by</FormLabel>
                                <FormControl>
                                    <Input {...field} autoComplete="off" placeholder="Mongoose" />
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
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-4">
                            <Button variant="outline" type="button" onClick={() => form.reset()}>
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
