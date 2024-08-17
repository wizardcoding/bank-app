'use server';

import { createSessionClient, createAdminClient, createSessionLogin } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { encryptId, parseStringify, extractCustomerIdFromUrl } from "@/lib/utils";
import { Products, CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum } from "plaid";
import { PlaidClient } from "@/lib/server/plaid"
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "@/lib/server/dwolla.actions";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
    APP_SESSION_COOKIE_NAME,
    PLAID_SECRET,
    PLAID_CLIENT_ID,
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
        const user = await getUserInfo({userId: response.userId});
        createSessionCookie(response.secret);
        const signedUp = await parseStringify(user);
        
        return signedUp;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export const signUp = async ({password, ...userData}: SignUpParams) => {
    const { email, firstName, lastName, address_1, zipCode, ssn, dateOfBirth } = userData;
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

        const dwollaUserData = {address1: address_1, postalCode: zipCode, Ssn: ssn, dateOfBrith: dateOfBirth, ...userData};
        
        const dwollaCustomerUrl = await createDwollaCustomer({
          ...dwollaUserData,
          type: 'personal'
        });

        if(!dwollaCustomerUrl) {
          throw new Error("Error Creating Dwolla Customer.");
        }

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

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
      const userFetch = await account.get();
      const user = await getUserInfo({ userId: userFetch.$id});
  
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
  const { firstName, lastName } = user;
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${firstName} ${lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
    }

    const response = await PlaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}

export const createBankAccount = async(bankAccountParams: createBankAccountProps) => {

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
        const response = await PlaidClient.itemPublicTokenExchange({
          public_token: publicToken,
          client_id: PLAID_CLIENT_ID!,
          secret: PLAID_SECRET!,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountResponse = await PlaidClient.accountsGet({
          access_token: accessToken,
          client_id: PLAID_CLIENT_ID!,
          secret: PLAID_SECRET!,
        });

        const accountData = accountResponse.data.accounts[0];

        const request: ProcessorTokenCreateRequest = {
          access_token: accessToken,
          account_id: accountData.account_id,
          processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
          client_id: PLAID_CLIENT_ID!,
          secret: PLAID_SECRET!,
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
          shareableId: `${encryptId(accountData.account_id)}`,
        });

        revalidatePath("/");

        return parseStringify({
          publicTokenExchange: "complete"
        });
    } catch (error) {
        console.log('exchangePublicToken - error ', parseStringify(error));

        return null;
    }

}

export const getBank = async (userData: getBankProps) => {
  const { documentId } = userData;
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('$id', [documentId])]
    );

    return parseStringify(bank.documents);
    
  } catch (error) {
    console.log('getBank: ', error);
  }
}

export const getBanks = async (userData: getBanksProps) => {
  const { userId } = userData;
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    return parseStringify(banks.documents);
    
  } catch (error) {
    console.log('getBanks: ', error);
  }
}
