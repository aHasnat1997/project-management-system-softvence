import type React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUserCreateMutation } from '@/redux/endpoints/userApi';
import SingleFileSelector from '../FileUploader/SingleFileSelector';
import { useState } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const formSchema = z.object({
    userName: z.string().min(2),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    employeeId: z.string().min(2),
    email: z.string().email().min(2),
    phoneNumber: z.string().min(2),
    designation: z.string().min(2),
    role: z.enum(['Admin', 'Management', 'Sells', 'Operation']),
    userStatus: z.enum(['Active', 'Deactivate']),
    teamLead: z.string().optional(),
    team: z.string().optional(),
    address: z.string().optional(),
    subArea: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
});

export default function RegistrationContent(): React.ReactNode {
    const [userCreate, { isLoading, isSuccess, isError }] = useUserCreateMutation();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarError, setAvatarError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            employeeId: '',
            email: '',
            phoneNumber: '',
            designation: '',
            role: 'Operation',
            userStatus: 'Active',
            teamLead: '',
            team: '',
            address: '',
            subArea: '',
            district: '',
            state: '',
            country: '',
        },
    });

    const handleFileSelect = (file: File | null) => {
        setAvatarError(null); // Reset error when new file is selected

        if (file) {
            // Validate file type
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setAvatarError('Invalid file type. Please upload a JPEG, PNG, or WEBP image.');
                setAvatar(null);
                return;
            }

            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                setAvatarError('File size too large. Maximum allowed size is 5MB.');
                setAvatar(null);
                return;
            }
        }

        setAvatar(file);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Check if avatar is required (you can make this conditional if needed)
        if (!avatar) {
            setAvatarError('Please upload a profile picture');
            return;
        }

        const formData = new FormData();
        const payload = {
            ...values,
        };

        formData.append('data', JSON.stringify(payload));
        formData.append('file', avatar);

        try {
            await userCreate(formData).unwrap();
            if (isSuccess) {
                toast.success('User is registered successfully!');
            }

            if (isError) {
                toast.error('User registration failed. Please try again.');
            }
            toast.success('User is registered successfully!');

            // Reset form
            form.reset({
                userName: '',
                firstName: '',
                lastName: '',
                employeeId: '',
                email: '',
                phoneNumber: '',
                designation: '',
                role: 'Operation',
                userStatus: 'Active',
                teamLead: '',
                team: '',
                address: '',
                subArea: '',
                district: '',
                state: '',
                country: '',
            });
            setAvatar(null);
            setAvatarError(null);
        } catch (err) {
            console.error('Registration failed:', err);
            toast.error('Registration failed. Please try again.');
        }
    }

    return (
        <section className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="w-full flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" placeholder="John" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" placeholder="Doe" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            autoComplete="off"
                                            placeholder="your@example.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="tel"
                                            autoComplete="off"
                                            placeholder="+8801234567890"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="employeeId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Employee ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="EMP12345"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Designation</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Software Engineer"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Management">Management</SelectItem>
                                            <SelectItem value="Sells">Sells</SelectItem>
                                            <SelectItem value="Operation">Operation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userStatus"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>User Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a User Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Deactivate">Deactivate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="john_doe"
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
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Team Lead</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Team lead username"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Mirpur-10"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subArea"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Sub Area</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Shenpara"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">District</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" placeholder="Dhaka" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">State</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" placeholder="Dhaka" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-[#6B6B6B]">Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="Bangladesh"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormItem>
                            <FormLabel className="text-[#6B6B6B]">Profile Picture</FormLabel>
                            <SingleFileSelector
                                allowedFormats={ACCEPTED_IMAGE_TYPES}
                                onFileSelected={handleFileSelect}
                                maxSize={MAX_FILE_SIZE}
                            />
                            {avatarError && (
                                <p className="text-sm font-medium text-destructive">
                                    {avatarError}
                                </p>
                            )}
                            {avatar && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    Selected file: {avatar.name} (
                                    {(avatar.size / 1024 / 1024).toFixed(2)}MB)
                                </p>
                            )}
                        </FormItem>
                    </div>

                    <div className="w-full flex items-center justify-between gap-4">
                        <DialogClose disabled asChild>
                            <Button
                                variant="outline"
                                type="reset"
                                className="flex-1"
                                onClick={() => {
                                    form.reset();
                                    setAvatar(null);
                                    setAvatarError(null);
                                }}
                                disabled={isLoading}
                            >
                                Reset
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
}
