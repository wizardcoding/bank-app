"use client";
import { cn, formatAmount, formUrlQuery, getAccountTypeColors } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const BankInfo = (props: BankInfoProps) => {
  const { account, appwriteItemId, type } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const colors = getAccountTypeColors(account?.type as AccountTypes);
  const { name, subtype, currentBalance } = account;
  const isActive = appwriteItemId === account?.appwriteItemId;
  const {title, lightBg, bg, subText} = colors;
  const isCard = type === 'card';

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'id',
      value: account?.appwriteItemId,
    });
    router.push(newUrl, {scroll: false});
  }

  return (
    <div
      onClick={handleBankChange}
      className={cn(
        `bank-info ${bg}`, 
        {
          "shadow-sm border-blue-700" : isCard && isActive,
          "rounded-xl": isCard,
          "hover: shadow-sm cursor-pointer": isCard
        }
      )}
    >
      <figure
        className={`flex-center h-fit rouded-full bg-blue-100 ${lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div
        className="flex w-full flex-1 flex-col justify-center gap-1"
      >
        <div className="bank-info_content">
          <h2
            className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${title}`}
          >
            {name}
          </h2>
          {type === 'full' && (
            <p
              className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${lightBg}`}
            >
              {subtype}
            </p>
          )}
        </div>
        <p
          className={`text-16 font-medium text-blue-700 ${subText}`}
        >
          {formatAmount(currentBalance)}
        </p>
      </div>
    </div>
  )
}

export default BankInfo