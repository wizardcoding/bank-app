import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const isLogged = async() => {
    const loggedUser = await getLoggedInUser();

    if (loggedUser) {

        return loggedUser;
    } else {
        redirect("/sign-in");
    }
}