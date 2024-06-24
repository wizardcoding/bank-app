import AnimatedCounter from "@/components/ui/AnimatedCounter"

const TotalBalanceBox = (props: TotalBalanceBoxProps) => {
    const {accounts = [], totalBanks, totalCurrentBalance} = props
    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                the chardt
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Bank Accounts: {totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className ="total-balance-label">
                        Total Current Balance
                    </p>
                    <p className="total-balance-amount flex-center gap-2">
                        <AnimatedCounter amount={totalCurrentBalance} decimals={2}/>  
                    </p>
                </div>
            </div>
        </section>
    )
}

export default TotalBalanceBox;