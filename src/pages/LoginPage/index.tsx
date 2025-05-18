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

const formSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(8)
})

export default function LoginPage(): React.ReactNode {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                        <Input {...field} className="w-[316px]" autoComplete="off" />
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
                        <Input {...field} className="w-[316px]" type="password" />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-end text-primary">Forgot Password?</FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Log In</Button>
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
