import type React from "react";
import loginImage from "../../assets/loginImage.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { storeUserInfo } from "@/redux/slices/authSlice";
import { useUserLoginMutation } from "@/redux/endpoints/authApi";

const formSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(8)
})

export default function LoginPage(): React.ReactNode {
  const [userLogin, { isLoading, isSuccess, isError }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });
  // console.log({ isSuccess, isLoading, isError });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await userLogin(values);
      console.log(data);

      if (data.success) {
        console.log('hello');

        dispatch(storeUserInfo(data.data.accessToken));
        toast.success("Successfully login")
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <section className="max-w-[1200px] min-h-[100vh] lg:px-4 mx-auto flex items-center justify-center">
      <div className="w-full flex items-center justify-center lg:justify-between">
        <div className="mx-6 lg:mx-0">
          <h1 className="text-[50px] font-bold">Sof<span className="text-primary">t</span>vence</h1>
          <div className="mt-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6B6B6B]">Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[316px]" autoComplete="off" placeholder="your@example.mail" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6B6B6B]">Password</FormLabel>
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
                      <FormDescription className="text-end text-primary">
                        <Link to='/forgot-password'>
                          Forgot Password?
                        </Link>
                      </FormDescription>
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
                        'Login'
                  }
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </section>
  )
};
