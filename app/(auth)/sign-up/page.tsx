import AuthForm from "@/components/ui/AuthForm";
import { isLogged } from "@/lib/auth/actions";
import { redirect } from "next/navigation";

const SignUp = async () => {
    // const user = await isLogged();

    // if (user) {
    //     redirect("/");
    // }
    return(
        <section>
            <section className="flex-center size-full max-sm:px-6:">
                <AuthForm type="sign-up"/>
            </section>
        </section>
    )
}

export default SignUp