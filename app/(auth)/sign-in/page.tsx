import AuthForm from "@/components/ui/AuthForm"
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from "next/navigation";

const SignIn = async () => {
    const user = await getLoggedInUser();

    console.log('user', user);

    if (user) {
        redirect("/");
    }

    return(
        <section>
            <section className="flex-center size-full max-sm:px-6:">
                <AuthForm type="sign-in"/>
            </section>
        </section>
    )
}

export default SignIn