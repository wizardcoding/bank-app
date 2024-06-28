import HeaderBox from "@/components/ui/HeaderBox"
import RightSideBar from "@/components/ui/RightSideBar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox"
const Home = () => {
  const loggedIn = {fisrtName: "Xayuzaii"};
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.fisrtName || "Guest"}
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
        user={loggedIn}
        transactions={[]}
        banks={[]}
      />
    </section>
  )
}

export default Home