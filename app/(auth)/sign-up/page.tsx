import AuthForm from "@/components/ui/AuthForm";
import { getLoggedInUser } from '@/lib/actions/user.actions'

const SignUp = async () => {
    return(
        <section>
            <section className="flex-center size-full max-sm:px-6:">
                <AuthForm type="sign-up"/>
            </section>
        </section>
    )
}

export default SignUp