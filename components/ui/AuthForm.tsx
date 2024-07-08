'use client';

import HomeLink from "@/components/ui/HomeLink";
import { useState } from "react";

const AuthForm = (props: AuthFormProps) => {
    const{ type = 'sign-in'} = props;
    const [user, setUser] = useState(null);

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
            <>
                FORM
            </>
        )}
    </section>
  )
}

export default AuthForm