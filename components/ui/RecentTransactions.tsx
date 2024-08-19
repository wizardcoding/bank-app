import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const RecentTransactions = (props: RecentTransactionsProps) => {
    const { accounts, transactions = [], appwriteItemId, page = 1 } = props;
  return (
    <section className="recent-transactions">
        <header className="flex items-center justify-between">
            <h2 className="recent-transactions-label">
                Recent Transactions
            </h2>
            <Link href={`/transaction-history/?id=${appwriteItemId}`} className="view-all-btn">
                View All
            </Link>
        </header>

    </section>
  )
}

export default RecentTransactions