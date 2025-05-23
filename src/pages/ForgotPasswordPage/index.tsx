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
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/redux/endpoints/authApi";

const formSchema = z.object({
  email: z.string().email().min(2)
})

export default function ForgotPasswordPage(): React.ReactNode {
  const [forgotPassword, { isLoading, isSuccess, isError }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await forgotPassword(values);
      if (data.success) {
        toast.success("Check your Email for next process")
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
    console.log(values);
    toast.success("Check your Email for next process")
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
                <div className="w-full flex items-center gap-4">
                  <Button
                    type="button"
                    className="w-[150px]"
                    variant='outline'
                    onClick={() => navigate('/login')}
                    disabled={isLoading || isSuccess}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-[150px]"
                    disabled={isLoading || isSuccess}
                  >
                    {
                      isLoading ? 'Loading...' :
                        isError ? 'Error' :
                          'Send'
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
};
