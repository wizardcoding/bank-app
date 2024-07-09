'use client';

import HomeLink from "@/components/ui/HomeLink";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import  Field  from "@/components/ui/Field";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";

const AuthForm = (props: AuthFormProps) => {
    const{ type = 'sign-in'} = props;
    const [user, setUser] = useState(null);

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
        },
      });

      const { control } = form;
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof authFormSchema>) {
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
                    <Field 
                        name="email"
                        label="Email" 
                        placeholder="Enter your Email" 
                        control={control}
                    />

                    <Field 
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        control={control}
                    />
                    <Button type="submit" className="form-btn">Submit</Button>
                </form>
            </Form>
        )}
    </section>
  )
}

export default AuthForm