import { formatAmount } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Copy from "@/components/ui/Copy";

const BankCard = (props: CreditCardProps) => {
    const {
        account,
        userName,
        showBalance = true
    } = props;
    const {name = '', currentBalance = 0, mask = '', appwriteItemId = '', shareableId = ''} = account;

    return (
        <div className="flex flex-col">
            <Link href={`/transaction-history/?id=${appwriteItemId}`} className="bank-card">
                <div className="bank-card_content">
                    <div>
                        <h1 className="text-16 font-semibold text-white">
                            {name || `* ${userName} *`}
                        </h1>
                        <p className="font-ibm-plex-serif font-back text-white">
                            {showBalance && formatAmount(currentBalance)}
                        </p>
                    </div>
                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h1 className="text-12 font-semibold text-white">
                                {userName}
                            </h1>
                            <h2 className="text-12 font-semibold text-white">
                                ⋆⋆ / ⋆⋆
                            </h2>
                        </div>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                        ⋆⋆⋆⋆ ⋆⋆⋆⋆ ⋆⋆⋆⋆ <span className="text-16">{mask || 6666}</span>
                        </p>
                    </article>
                </div>
                <div className="bank-card_icon">
                    <Image 
                        alt="bank_pay"
                        src="/icons/Paypass.svg"
                        width={20} 
                        height={24}
                    />
                    <Image 
                        src="/icons/mastercard.svg"
                        width={45}
                        height={32}
                        alt="mastercard"
                        className="ml-5"
                    />
                </div>
                <Image
                    src="/icons/lines.png"
                    width={316}
                    height={190}
                    alt="lines"
                    className="absolute top-0 left-0"
                />
            </Link>
            {showBalance && <Copy title={`${shareableId}`}/>}
        </div>
    )
}

export default BankCard