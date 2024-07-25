import HeaderBox from "@/components/ui/HeaderBox"
import RightSideBar from "@/components/ui/RightSideBar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox"
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Home = async () => {
  const loggedUser = await getLoggedInUser();

  console.log('user', loggedUser);

  if (!loggedUser) {
    redirect("/sign-in");
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={user?.name || "Guest"}
            subtext="Access and Manage your account and transactions with ease"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.70}
          />
        </header>
        RECENT transactions
      </div>
      <RightSideBar
        user={user}
        transactions={[]}
        banks={[{ currentBalance: 56.40 }, { currentBalance: 98.40 }]}
      />
    </section>
  )
}

export default Home