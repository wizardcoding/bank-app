import AnimatedCounter from "@/components/ui/AnimatedCounter"
import DonutChart from "@/components/ui/DonutChart"

const TotalBalanceBox = (props: TotalBalanceBoxProps) => {
    const {accounts = [], totalBanks, totalCurrentBalance} = props
    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                <DonutChart accounts={accounts}/>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Bank Accounts: {totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className ="total-balance-label">
                        Total Current Balance
                    </p>
                    <div className="total-balance-amount flex-center gap-2">
                        <AnimatedCounter prefix={'$'} amount={totalCurrentBalance} decimals={2}/>  
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TotalBalanceBox;