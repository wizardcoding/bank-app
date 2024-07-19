'use server';
import { createSessionClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";

export const signIn = async (data: any) => {
    try {
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        // yeah bitch...
    }
}

export const signUp = async (data: SignUpParams) => {
    const { email, password, firstName, lastName } = data;
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("bank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const response = await parseStringify(newUserAccount);
        console.log('response', response);
        return response;
    } catch (error) {
        console.error(error);
        return parseStringify(error);
    } finally {
        // yeah bitch...
    }
}

export const getLoggedInUser = async () => {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }
