import HeaderBox from "@/components/ui/HeaderBox"
import { isLogged } from "@/lib/auth/actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";

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


  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox title="Transaction History" subtext="Banks Details and transactions"/>
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
            <p className="text-14 text-blue-25">
              {account.fullName}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory