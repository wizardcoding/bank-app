import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BankTabItem from "@/components/ui/BankTabItem";
import BankInfo from "@/components/ui/BankInfo";
import TransactionsTable from "@/components/ui/TransactionsTable";

const RecentTransactions = (props: RecentTransactionsProps) => {
    const { accounts, appwriteItemId, transactions = [], page = 1 } = props;
    const contentUI = accounts.reduce((previousValue, currentValue) => {
        previousValue.TabsTriggerContent = [
            ...previousValue.TabsTriggerContent, 
            (
                <TabsTrigger key={currentValue.id} value={currentValue.appwriteItemId}>
                    <BankTabItem appwriteItemId={currentValue.appwriteItemId} account={currentValue}/>
                </TabsTrigger>
            )
        ];

        previousValue.tabsContentData = [
            ...previousValue.tabsContentData,
            (
                <TabsContent 
                    value={currentValue.appwriteItemId} 
                    key={currentValue.id} 
                    className="space-y-4"
                >
                    <BankInfo account={currentValue} appwriteItemId={currentValue.appwriteItemId} type="full"/>
                    <TransactionsTable transactions={transactions}/>
                </TabsContent>
            )
        ];

        return previousValue;
    }, {
            TabsTriggerContent: [] as any[],
            tabsContentData: [] as any[]
        });

    const { TabsTriggerContent, tabsContentData } = contentUI;

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
        <Tabs defaultValue={appwriteItemId} className="w-full">
            <TabsList className="recent-transactions-tablist">
               {TabsTriggerContent} 
            </TabsList>
            {tabsContentData}
        </Tabs>
    </section>
  )
}

export default RecentTransactions