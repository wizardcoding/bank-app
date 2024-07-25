'use server';
import { createSessionClient, createAdminClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  } = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
      const { database } = await createAdminClient();
  
      const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

export const signIn = async (data: signInProps) => {
    const { email, password } = data;
    try {
        const { account } = await createSessionClient();
        const response = await account.createEmailPasswordSession(email, password);
        
        return parseStringify(response);
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

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
  
      //const user = await getUserInfo({ userId: user.$id})
  
      return parseStringify(result);
    } catch (error) {
      console.log(error)
      return null;
    }
  }
