'use client';

import HomeLink from "@/components/ui/HomeLink";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import  Field  from "@/components/ui/Field";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { authFormDefaultValues } from '@/constants'
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = (props: AuthFormProps) => {
    const router = useRouter();
    const{ type } = props;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLabel, setPageLabel] = useState("");
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...authFormDefaultValues },
      });

    const { control } = form;
    const [footerNavigation, setFooterNavigation] = useState<IfooterNavigation>({
        footerNote: "", 
        navigation: "",
        label: ""
    });

    useEffect(() => {
        if(type === 'sign-in') {
            setFooterNavigation({
                footerNote: "Don't have an account ?", 
                navigation: "/sign-up",
                label: "Sign Up"
            });
            setPageLabel("Sign In");
        } else {
            setFooterNavigation({
                footerNote: "Already have an account", 
                navigation: "/sign-in",
                label: "Sign In"
            });
            setPageLabel("Sign Up");
        }
    }, [type]);

    const loader = (
        <>
            <Loader2 size={20} className="animate-spin"/>
            <span className="ml-2">{'Loading...'}</span>
        </>
    );

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        setIsLoading(!isLoading);
        try {
            if(type === 'sign-in') {
                const response = await signIn({email: values.email, password: values.password});
                console.log('response', response);
                if(response) {
                    router.push('/');
                }
            }
            if(type === 'sign-up') {
                const newUser = await signUp(values);
                setUser(newUser);
                if(user) {
                    setPageLabel('link account');
                } else if(type === 'sign-up') {
                    setPageLabel('Sign Up');
                } else {
                    setPageLabel('Sign In');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <section className="auth-form">
        <header className="flex flex-call gap-5 md:gap-8">
            <HomeLink/>
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-18 lg:text-36 font-semibold text-gray-900">
                    {pageLabel}
                    <p className="text-14 font-normal text-gray-600">
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
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                                <div className="flex gap-4">
                                    <Field
                                        name="firstName"
                                        label="Fisrt Name"
                                        placeholder="Ex: John"
                                        control={control}
                                    />

                                    <Field
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Ex: Doe"
                                        control={control}
                                    />
                                </div>

                                <Field
                                    name="address_1"
                                    label="Address"
                                    placeholder="Enter your especific Address"
                                    control={control}
                                />

                                <Field
                                    name="city"
                                    label="City"
                                    placeholder="ex: San Diego"
                                    control={control}
                                />

                                <div className="flex gap-4">
                                    <Field
                                        name="state"
                                        label="State"
                                        placeholder="ex: NY"
                                        control={control}
                                    />

                                    <Field
                                        name="zipCode"
                                        label="Postal Code"
                                        placeholder="ex: 11101"
                                        control={control}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <Field
                                        name="dateOfBirth"
                                        label="Date of Brith"
                                        placeholder="yyyy-mm-dd"
                                        control={control}
                                    />

                                    <Field
                                        name="ssn"
                                        label="SSN"
                                        placeholder="ex: 1234"
                                        control={control}
                                    />
                                </div>
                            </>
                        )}
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
                        <div className="flex flex-col gap-4">
                            <Button type="submit" className="form-btn" disabled={isLoading}>
                                { isLoading ? loader : pageLabel }
                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600"> 
                        { footerNavigation.footerNote }
                    </p>
                    <Link className="form-link" href={footerNavigation.navigation}>
                        { footerNavigation.label }
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm