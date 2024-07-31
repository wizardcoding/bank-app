'use server';
import { createSessionClient, createAdminClient, createSessionLogin } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { Products, CountryCode } from "plaid";
import { PlaidClient } from "@/lib/server/plaid"


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
    APP_SESSION_COOKIE_NAME
  } = process.env;

const createSessionCookie = (secret: string): void => {
  cookies().set(APP_SESSION_COOKIE_NAME!, secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

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
        const { account } = await createSessionLogin();
        const response = await account.createEmailPasswordSession(email, password);
        createSessionCookie(response.secret);
        const signedUp = await parseStringify(response);
        
        return signedUp;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export const signUp = async (data: SignUpParams) => {
    const { email, password, firstName, lastName } = data;
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
          ID.unique(),
          email,
          password, 
          `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);
        createSessionCookie(session.secret);
        const response = await parseStringify(newUserAccount);
        
        return response;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export const getLoggedInUser = async() => {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
  
      //const user = await getUserInfo({ userId: user.$id})
  
      return parseStringify(user);
    } catch (error) {
      console.log(error)
      return null;
    }
}

export const logOut = async() => {
    try {
      const { account } = await createSessionClient();
      await account.deleteSession('current');
      cookies().delete(APP_SESSION_COOKIE_NAME!);
    } catch(error) {
      console.log(error);

      return null;
    }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,

      },
      client_name: user.name,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    };

    const response = await PlaidClient.linkTokenCreate(tokenParams);

    return parseStringify({
      linkToken: response.data.link_token
    });
  } catch(error) {
    console.log('createLinkToken - error', error);

    return null;
  }
}
