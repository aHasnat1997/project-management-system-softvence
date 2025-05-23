import type React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserCreateMutation } from "@/redux/endpoints/userApi";

const formSchema = z.object({
  userName: z.string().min(2),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  employeeId: z.string().min(2),
  email: z.string().email().min(2),
  phoneNumber: z.string().min(2),
  avatar: z.any().refine((file) => file instanceof File || file === undefined, {
    message: "Please upload a valid image file",
  }),
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
})

export default function RegistrationContent(): React.ReactNode {
  const [userCreate, { isLoading, isSuccess, isError }] = useUserCreateMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      avatar: undefined,
      designation: "",
      teamLead: "",
      team: "",
      address: "",
      subArea: "",
      district: "",
      state: "",
      country: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    const { avatar, ...rem } = values;
    console.log('rem===========>', rem);
    formData.append("file", avatar);
    formData.append("data", JSON.stringify(rem));
    console.log('formData', formData);
    try {
      await userCreate(formData).unwrap();
      toast.success("Registration successful!");
      form.reset({
        userName: "",
        firstName: "",
        lastName: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        avatar: undefined,
        designation: "",
        teamLead: "",
        team: "",
        address: "",
        subArea: "",
        district: "",
        state: "",
        country: ""
      });
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed.");
    }
  }

  return (
    <section className="lg:px-2 mx-auto flex items-center justify-center">
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
                    <Input {...field} autoComplete="off" placeholder="Jon" />
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
                    <Input {...field} autoComplete="off" placeholder="Doo" />
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
                    <Input {...field} autoComplete="off" placeholder="your@example.mail" />
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
                    <Input {...field} autoComplete="off" placeholder="+8801234567890" />
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
                  <FormLabel className="text-[#6B6B6B]">Employee Id</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" placeholder="45421" />
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
                    <Input {...field} autoComplete="off" placeholder="Team Lead" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange } }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#6B6B6B]">Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>User Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#6B6B6B]">User Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" placeholder="username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#6B6B6B]">Team</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" placeholder="Team Name" />
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
                    <Input {...field} autoComplete="off" placeholder="username" />
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
                    <Input {...field} autoComplete="off" placeholder="Mirpur-10" />
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
                    <Input {...field} autoComplete="off" placeholder="Shenpara" />
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
                    <Input {...field} autoComplete="off" placeholder="Bangladesh" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex items-center justify-end gap-4">
            <Button
              variant='outline'
              type="reset"
              onClick={() => form.reset({
                userName: "",
                firstName: "",
                lastName: "",
                employeeId: "",
                email: "",
                phoneNumber: "",
                avatar: undefined,
                designation: "",
                teamLead: "",
                team: "",
                address: "",
                subArea: "",
                district: "",
                state: "",
                country: ""
              })}
              disabled={isLoading || isSuccess}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
            >
              {
                isLoading ? 'Loading...' :
                  isError ? 'Error' :
                    'Submit'
              }
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
};
