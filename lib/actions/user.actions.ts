'use server';
import { createSessionClient, createAdminClient, createSessionLogin } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { encryptId, parseStringify, extractCustomerIdFromUrl } from "@/lib/utils";
import { Products, CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum } from "plaid";
import { PlaidClient } from "@/lib/server/plaid"
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "@/lib/server/dwolla.actions";
import { string } from "zod";


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
      );
  
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

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    try {
        const { account, database } = await createAdminClient();

        const newUserAccount = await account.create(
          ID.unique(),
          email,
          password, 
          `${firstName} ${lastName}`
        );

        if(!newUserAccount) {
          throw new Error("Error Creating user.");
        }

        const dwollaCustomerUrl = createDwollaCustomer({
          ... userData,
          type: 'personal'
        });

        if(!dwollaCustomerUrl) {
          throw new Error("Error Creating Dwolla Customer.");
        }

        const dwollaCustomerId = extractCustomerIdFromUrl(parseStringify(dwollaCustomerUrl));

        const newUser = await database.createDocument(
          DATABASE_ID!,
          USER_COLLECTION_ID!,
          ID.unique(),
          {
            ...userData,
            userId: newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl
          }
        );

        const session = await account.createEmailPasswordSession(email, password);
        createSessionCookie(session.secret);
        const response = await parseStringify(newUser);
        
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

export const createLinkToken = async(user: User) => {
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

export const createBankAccount = async(bankAccountParams: createBankAccountProps) => {
  const { 
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId
  } = bankAccountParams;

  try {
    const { database } = await createAdminClient();
    
    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {...bankAccountParams}
    );

    return parseStringify(bankAccount);
  } catch (error) {
      console.log("createBankAccount - - ", error);

      return null;
  }
}

export const exchangePublicToken = async(publicTokenArgs: exchangePublicTokenProps) => {
    const {publicToken, user} = publicTokenArgs;

    try {
        const response = await PlaidClient.itemPublicTokenExchange({public_token: publicToken});
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;
        const accountResponse = await PlaidClient.accountsGet({access_token: accessToken});
        const accountData = accountResponse.data.accounts[0];

        const request: ProcessorTokenCreateRequest = {
          access_token: accessToken,
          account_id: accountData.account_id,
          processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        };

        const processorTokenResponse = await PlaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
          dwollaCustomerId: user.dwollaCustomerId,
          processorToken,
          bankName: accountData.name,
        });

        if(!fundingSourceUrl) {
          throw Error;
        }

        await createBankAccount({
          userId: user.$id,
          bankId: itemId,
          accountId: accountData.account_id,
          accessToken,
          fundingSourceUrl,
          sharableId: encryptId(accountData.account_id),
        });

        revalidatePath("/");

        return parseStringify({
          publicTokenExchange: "complete"
        });
    } catch (error) {
        console.log('exchangePublicToken - error ', error);

        return null;
    }

}
