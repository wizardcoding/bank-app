"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { PlaidClient } from "@/lib/server/plaid"
import { parseStringify } from "@/lib/utils";
import { getTransactionsByBankId } from "@/lib/actions/transaction.actions";
import { getBanks, getBank } from "@/lib/actions/user.actions";

const {
  PLAID_SECRET,
  PLAID_CLIENT_ID,
} = process.env;

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await getBanks({ userId });
    const accounts = await Promise.all(
      banks?.map(async (bank: Bank, index: number) => {
        // get each account info from plaid
        const accountsResponse = await PlaidClient.accountsGet({
          access_token: bank.accessToken,
          client_id: PLAID_CLIENT_ID!,
          secret: PLAID_SECRET!,
        });
        const accountData = accountsResponse.data.accounts.pop()!;

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
          client_id: PLAID_CLIENT_ID!,
          secret: PLAID_SECRET!,
        });

        // get transfer transactions from appwrite
        const transferTransactionsData = await getTransactionsByBankId({
          bankId: bank.$id,
        });

        const transferTransactions = transferTransactionsData.documents.map(
          (transferData: Transaction) => ({
            id: transferData.$id,
            name: transferData.name!,
            amount: transferData.amount!,
            date: transferData.$createdAt,
            paymentChannel: transferData.channel,
            category: transferData.category,
            type: transferData.senderBankId === bank.$id ? "debit" : "credit",
          })
        );

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          sharaebleId: bank.sharableId,
          at: bank.accessToken,
          transactions: transferTransactions,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total: number, account: any) => {

      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get one bank account
export const getAccount = async (params: any) => {
  const { appwriteItemId } = params;
  
  try {
    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    
    const { $id, accessToken } = bank;
    
    // get account info from plaid
    const accountsResponse = await PlaidClient.accountsGet({
      access_token: accessToken,
      client_id: PLAID_CLIENT_ID!,
      secret: PLAID_SECRET!,
    });
    const accountData = accountsResponse.data.accounts.pop()!;
    
    // get transfer transactions from appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: $id,
    });
    
    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === $id ? "debit" : "credit",
      })
    );
    
    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
      client_id: PLAID_CLIENT_ID!,
      secret: PLAID_SECRET!,
    });
    
    const transactions = await getTransactions({
      accessToken: accessToken,
    });
    
    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: $id,
    };

    // sort transactions by date such that the most recent transaction is first
      const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await PlaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
      client_id: PLAID_CLIENT_ID!,
      secret: PLAID_SECRET!,
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await PlaidClient.transactionsSync({
        access_token: accessToken,
        client_id: PLAID_CLIENT_ID!,
        secret: PLAID_SECRET!,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};