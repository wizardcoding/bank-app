import Link from "next/link";
import Image from 'next/image'
import BankCard from "@/components/ui/BankCard";
import Category from "@/components/ui/Category";
import { countTransactionCategories } from "@/lib/utils";

const RightSideBar = (props: RightSidebarProps) => {
  const { user, banks, transactions } = props;
  const{ email = '', firstName = '', lastName = '' } = user;
  const fullName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
  const categories: CategoryCount[] = countTransactionCategories(transactions)
  return (
    <aside className="right-sidebar">
        <section className="flex flex-col pb-8">
            <div className="profile-banner"/>
            <div className="profile">
              <div className="profile-img">
                <span className="text-4xl font-bold text-blue-500">
                  {`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` || "X"}
                </span>
              </div>
              <div className="profile-details">
                <h1 className="profile-name">
                  {fullName}
                </h1>
                <p className="profile-email">{email}</p>
              </div>
            </div>
        </section>
        <section className="banks">
          <div className="flex w-full justify-between">
            <h2 className="header-2">
              My Banks
            </h2>
            <Link href="/" className="flex gap-2">
              <Image alt="plus" src="/icons/plus.svg" width={20} height={20}/>
              <h2 className="text-14 font-semibold text-gray-600">
                Add bank
              </h2>
            </Link>
          </div>
          {banks?.length > 0 && (
            <div className="relative
              flex
              flex-1
              flex-col
              items-center
              justify-center
              gap-5"
            >
              {banks?.map((bank: any, index: number) => {
                if(index > 1) {
                  return;
                }
                if(index < 1) {
                  return (
                    <div className="relative z-10" key={'bank' + index}>
                      <BankCard
                        key={bank.$id}
                        account={bank}
                        userName={fullName}
                        showBalance={false}
                      />
                    </div>
                  )
                } else {
                  return(
                    <div className={`absolute right-0 top-4 z-0 w-[90%]`} key={'bank' + index}>
                      <BankCard
                        key={bank.$id}
                        account={bank}
                        userName={fullName}
                        showBalance={false}
                      />
                    </div>
                  )
                }
              })}
            </div>
          )}
          <div className="mt-10 flex flex-1 flex-col gap-6">
            <h2 className="header-2">Top Categories</h2>
            <div className="space-y-5">
              {categories.map((category, index) => {
                return(<Category key={category.name} category={category} />)
              })}
            </div>
          </div>
        </section>
    </aside>
  )
}

export default RightSideBar