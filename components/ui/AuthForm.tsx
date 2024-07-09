'use client';

import HomeLink from "@/components/ui/HomeLink";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const AuthForm = (props: AuthFormProps) => {
    const{ type = 'sign-in'} = props;
    const [user, setUser] = useState(null);
    const formSchema = z.object({
        username: z.string({ description: "Enter User" }).min(4, { 
            message: "User must be at least 4 characters long" 
        }).max(20, {
            message: "User Must have a maximum of 20 characters"
        }),
        email: z.string({ description: "Enter you Email" }).email({ message: "Enter a valid Email" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

    const getLegend = (): string => {
        if(user) {
            return 'Link Account';         
        } else {
            return type === 'sign-in' ? 'Sign In' : 'Sign Out';
        }
    }
  return (
    <section className="auth-form">
        <header className="flex flex-call gap-5 md:gap-8">
            <HomeLink/>
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {getLegend()}
                    <p className="text-16 font-normal text-gray-600">
                        {user ? 'Link your Account to get started' : 'Enter your Details'}
                    </p>
                </h1>
            </div>
            <form>
            </form>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                {/* {Plaid link component} */}
            </div>
        ): (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <div className="form-item">
                            <FormLabel className="from-label">
                                Email
                            </FormLabel>
                            <div className="flex w-full flex-col">
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your Email"
                                        className="input-class"
                                        { ...field }
                                    />
                                </FormControl>
                                <FormMessage className="form-message mt-3 ml-1"/>
                            </div>
                            
                            <FormLabel className="from-label">
                                Email
                            </FormLabel>
                            <div className="flex w-full flex-col">
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your Email"
                                        className="input-class"
                                        { ...field }
                                    />
                                </FormControl>
                                <FormMessage className="form-message mt-3 ml-1"/>
                            </div>
                        </div>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        )}
    </section>
  )
}

export default AuthForm