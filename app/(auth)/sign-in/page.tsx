import AuthForm from "@/components/ui/AuthForm"

const SignIn = async () => {

    return(
        <section>
            <section className="flex-center size-full max-sm:px-6:">
                <AuthForm type="sign-in"/>
            </section>
        </section>
    )
}

export default SignIn