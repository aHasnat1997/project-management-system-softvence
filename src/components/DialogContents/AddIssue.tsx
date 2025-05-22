import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const formSchema = z.object({
    issueDate: z.date().optional(),
    projectId: z.string().min(1, 'Project ID is required'),
    teamId: z.string().min(1, 'Team ID is required'),
    memberId: z.string().min(1, 'Member ID is required'),
    status: z.string().min(1, 'Status is required'),
    marketingProfileId: z.string().min(1, 'Marketing Profile ID is required'),
    note: z.string().min(1, 'Note is required'),
});

export default function AddIssue() {
    const [calendarOpen, setCalendarOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            issueDate: undefined,
            projectId: '',
            teamId: '',
            memberId: '',
            status: '',
            marketingProfileId: '',
            note: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log('Form submitted:', values);
            toast.success('Issue added successfully!');
            form.reset();
        } catch (err) {
            console.error('Submission failed:', err);
            toast.error('Failed to add issue.');
        }
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="issueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-[#6B6B6B]">Issue Date</FormLabel>
                                    <Popover
                                        open={calendarOpen}
                                        onOpenChange={setCalendarOpen}
                                        modal
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Select a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 " align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={date => {
                                                    field.onChange(date);
                                                    setCalendarOpen(false);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">Project ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="#921912564525"
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="teamId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">Team ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="#921912564525"
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="memberId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">Member ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="#921912564525"
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">Status</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="String" autoComplete="off" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketingProfileId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#6B6B6B]">
                                        Marketing Profile ID
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="String" autoComplete="off" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#6B6B6B]">Note</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="That's where design meets execution. Every button, animation, and layout starts as an idea, a static visual. But through thoughtful development, these elements become functional, interactive..."
                                        className="min-h-[120px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex items-center justify-end gap-4 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() =>
                                form.reset({
                                    issueDate: undefined,
                                    projectId: '',
                                    teamId: '',
                                    memberId: '',
                                    status: '',
                                    marketingProfileId: '',
                                    note: '',
                                })
                            }
                        >
                            Reset
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </section>
    );
}
