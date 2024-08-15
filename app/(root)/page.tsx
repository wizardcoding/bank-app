import HeaderBox from "@/components/ui/HeaderBox"
import RightSideBar from "@/components/ui/RightSideBar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox"
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { isLogged } from "@/lib/auth/actions";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const Home = async ({ searchParams: {id, page} }: SearchParamProps) => {
  const loggedUser = await isLogged();
  const accounts = await getAccounts({userId: loggedUser?.$id});

  if(!accounts) {
    return;
  }

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  console.log({accountsData, account})

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedUser?.name || "Guest"}
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
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home