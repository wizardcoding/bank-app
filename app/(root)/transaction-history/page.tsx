import HeaderBox from "@/components/ui/HeaderBox"
import { isLogged } from "@/lib/auth/actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { formatAmount } from "@/lib/utils";
import TransactionsTable from "@/components/ui/TransactionsTable";
import { getPaginationContent } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

const TransactionHistory = async ({searchParams: { id, page }}: SearchParamProps) => {
  const currentPage = parseInt(page as string) || 1;
  const loggedUser = await isLogged();
  const accounts = await getAccounts({userId: loggedUser?.$id});
  if(!accounts) {
    return;
  }
  // const accountSingle = getAccount(accounts.data[0].appwriteItemId)
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({appwriteItemId});
  const { transactions = [] } = account;
  const { totalPages, currentTransactions } = getPaginationContent(transactions, currentPage);


  const {name = '', officialName = '', mask = '', currentBalance = 0} = account?.data;

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox title="Transaction History" subtext="Banks Details and transactions"/>
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{name}</h2>
            <p className="text-14 text-blue-25">
              {officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              **** **** **** {mask}
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(currentBalance)}</p>
          </div>
        </div>
       <section className="flex w-full flex-col gap-6">
        <TransactionsTable transactions={currentTransactions}/>
        {totalPages > 1 && (
            <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={currentPage} />
            </div>
        )}
      </section> 
      </div>
    </div>
  )
}

export default TransactionHistory