"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, formatAmount } from "@/lib/utils";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
  } from "@/components/ui/select";

export const BankDropdown = (props: BankDropdownProps) => {
    const { accounts = [], setValue = '', otherStyles = '' } = props;
    const [selected, setSelected] = useState(accounts[0])
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleBankChange = (id: string) => {
        const account = accounts.find(account => account.appwriteItemId === id)!;

        setSelected(account);
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "id",
            value: id,
        });

        if(setValue) {
            setValue("senderBank", id);
        }

        router.push(newUrl, {scroll: false});
    }

  return (
    <Select
        defaultValue={selected.id}
        onValueChange={value => handleBankChange(value)}
    >
        <SelectTrigger
            className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}
        >
            <Image
                src="icons/credit-card.svg"
                width={20}
                height={20}
                alt="account"
            />
            <p className="line-clamp-1 w-full text-left">{selected.name}</p>
        </SelectTrigger>
        <SelectContent
            className={`w-full bg-white md:w-[300px] ${otherStyles}`}
            align="end"
        >
            <SelectGroup>
                <SelectLabel className="py-2 font-normal text-gray-500">
                    Select a Bank to display
                </SelectLabel>
                {accounts.map(({id, appwriteItemId, name, currentBalance}: Account) => {
                    return (
                        <SelectItem
                        key={id}
                        value={appwriteItemId}
                        className="cursor-pointer border-t"
                        >
                        <div className="flex flex-col ">
                            <p className="text-16 font-medium">{name}</p>
                            <p className="text-14 font-medium text-blue-600">
                            {formatAmount(currentBalance)}
                            </p>
                        </div>
                        </SelectItem>
                    )
                })}
            </SelectGroup>
        </SelectContent>
    </Select>
  );
}
