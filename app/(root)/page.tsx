import HeaderBox from "@/components/ui/HeaderBox"
import RightSideBar from "@/components/ui/RightSideBar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox"
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { isLogged } from "@/lib/auth/actions";

const Home = async ({ searchParams: {id, page} }: SearchParamProps) => {
  const loggedUser = await isLogged();
  const accounts = await getAccounts({userId: loggedUser?.$id});
  const fullName = `${loggedUser.firstName.toUpperCase()} ${loggedUser.lastName.toUpperCase()}`;
  const accountsData = accounts?.data;
  //const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const getAccountFill = (appwriteItemId: string) => {
    return accountsData.filter((account: any) => {
      return account.appwriteItemId === appwriteItemId;
    })[0];
  }

  if(!accounts) {
    return;
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={(loggedUser.firstName || loggedUser.lastName) ? fullName : "Guest"}
            subtext="Access and Manage your account and transactions with ease"
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT transactions
      </div>
      <RightSideBar
        user={loggedUser}
        transactions={accounts?.transactions}
        banks={accountsData}
      />
    </section>
  )
}

export default Home