import type React from "react";
import loginImage from "../../assets/loginImage.png";
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
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/endpoints/authApi";

const formSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
})
// .refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords don't match"
// });

export default function ResetPasswordPage(): React.ReactNode {
  const storedData = localStorage.getItem('persist:userInfo');
  const userData = JSON.parse(storedData!).user;

  const [resetPassword, { isLoading, isSuccess, isError }] = useResetPasswordMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await resetPassword({ data: values, userId: JSON.parse(userData).id }).unwrap();
      // console.log('===============>', data);
      if (data) {
        toast.success("Password is changed successfully")
        navigate('/login');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.errorSources[0]?.message);
    }
  }

  return (
    <section className="max-w-[1200px] min-h-[100vh] lg:px-4 mx-auto flex items-center justify-center">
      <div className="w-full flex items-center justify-center lg:justify-between">
        <div className="hidden md:block">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="mx-6 lg:mx-0">
          <h1 className="text-[50px] font-bold">Sof<span className="text-primary">t</span>vence</h1>
          <div className="mt-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6B6B6B]">Old Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} className="w-[316px]" type={isOpen ? "text" : "password"} />
                          <button
                            className="absolute top-[6px] right-2 border-0 p-0 cursor-pointer"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {
                              isOpen ? <Eye /> : <EyeOff />
                            }
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6B6B6B]">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} className="w-[316px]" type={isOpen ? "text" : "password"} />
                          <button
                            className="absolute top-[6px] right-2 border-0 p-0 cursor-pointer"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {
                              isOpen ? <Eye /> : <EyeOff />
                            }
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6B6B6B]">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} className="w-[316px]" type={isOpen ? "text" : "password"} />
                          <button
                            className="absolute top-[6px] right-2 border-0 p-0 cursor-pointer"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {
                              isOpen ? <Eye /> : <EyeOff />
                            }
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isSuccess}
                >
                  {
                    isLoading ? 'Loading...' :
                      isError ? 'Error' :
                        'Submit'
                  }
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
};
