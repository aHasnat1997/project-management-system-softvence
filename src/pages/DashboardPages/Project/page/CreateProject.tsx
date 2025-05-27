import Headers from "@/components/Headers";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectCreateMutation } from "@/redux/endpoints/projectsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  clientName: z.string().min(2),
  sellsBy: z.string().min(2),
  orderStartDate: z.string().min(2),
  assignedTeam: z.array(z.string()),
  assignedBy: z.string().email().min(2),
  leadBy: z.string().min(2),
  deliveryDate: z.string().min(2),
  platfrom: z.string().min(2),
  marketingProfile: z.string().min(2),
  projectStatus: z.enum(['NRI', 'WIP', 'Hold', 'Cancel']),
  orderSheet: z.string().optional(),
  specialNote: z.string().optional()
});

export default function CreateProject() {
  const [createProject, { isLoading }] = useProjectCreateMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      sellsBy: "",
      orderStartDate: "",
      assignedTeam: [],
      assignedBy: "",
      leadBy: "",
      deliveryDate: "",
      platfrom: "",
      marketingProfile: "",
      projectStatus: 'NRI',
      orderSheet: "",
      specialNote: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted with values:', values);
  }

  return (
    <section>
      <div className="flex items-center gap-4">
        <button className="p-0 cursor-pointer" onClick={() => window.history.back()}>
          <ArrowLeft className="text-[#6B6B6B] hover:text-primary" />
        </button>
        <Headers title="Add Project" />
      </div>
      <div className="w-[748px] rounded-md border p-4 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Client Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" placeholder="Jhon Abraham" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Delivery Date</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" placeholder="16 March, 2025" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="sellsBy"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Sells By</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Faruk Ahmed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketingProfile"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Marketing profile URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        autoComplete="off"
                        placeholder="delowarhossain3/"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="orderStartDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Order Start Date</FormLabel>
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
                name="platfrom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Platform</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Fiver"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="assignedBy"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Assigned By</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Russel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectStatus"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Project Status</FormLabel>
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
                        <SelectItem value="NRI">NRI</SelectItem>
                        <SelectItem value="WIP">WIP</SelectItem>
                        <SelectItem value="Hold">Hold</SelectItem>
                        <SelectItem value="Cancel">Cancel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="assignedTeam"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Assigned Team</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Metcorn  team"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leadBy"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Lead By</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Sajib Ahmed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="orderSheet"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Order Sheet URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="delowarhossain3/"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialNote"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#6B6B6B]">Special Note</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Any special note"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[50%] flex items-center justify-between gap-4 ml-auto pl-2">
              <Button
                variant="outline"
                type="reset"
                className="flex-1"
                onClick={() => {
                  form.reset();
                }}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
