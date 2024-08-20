import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BankTabItem from "@/components/ui/BankTabItem";

const RecentTransactions = (props: RecentTransactionsProps) => {
    const { accounts, transactions = [], appwriteItemId, page = 1 } = props;
    const contentUI = { TabsTriggerContent: [] as any[], tabsContentData: [] as any[] };

    accounts.map((account: Account) => {
        contentUI.TabsTriggerContent = [
            ...contentUI.TabsTriggerContent, 
            (
                <TabsTrigger key={account.id} value={account.appwriteItemId}>
                    <BankTabItem appwriteItemId={appwriteItemId} account={account}/>
                </TabsTrigger>
            )
        ];

        contentUI.tabsContentData = [
            ...contentUI.tabsContentData,
            (
                <TabsContent 
                    value={account.appwriteItemId} 
                    key={account.id} 
                    className="space-y-4"
                >
                    data
                </TabsContent>
            )
        ];
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