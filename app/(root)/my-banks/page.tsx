import HeaderBox from "@/components/ui/HeaderBox"
import { isLogged } from "@/lib/auth/actions";
import { getAccounts } from "@/lib/actions/bank.actions";
import BankCard from "@/components/ui/BankCard";

const MyBanks = async () => {
  const loggedUser = await isLogged();
  const accounts = await getAccounts({userId: loggedUser?.$id});
  if(!accounts) {
    return;
  }

  const fetchAccounts = () => {

    return accounts.data.map((account: Account) => {
      return (
        <BankCard
          key={'account-' + account.id} 
          account={account}
          userName={account.name}
        />
      )
    });
  }

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My bank accounts"
          subtext="Effortlessly manage your banking activities"
        />
        <div className="space-y-4">
          <h2 className="header-2">
            Your Cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && fetchAccounts()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks