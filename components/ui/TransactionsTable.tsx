import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants";
import { cn, formatAmount, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";
import { text } from "node:stream/consumers";
  
const CategoryPill = (args: CategoryBadgeProps) =>  {
  const { category } = args;
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor
  } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles]
  || transactionCategoryStyles.default;

  return (
  <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
    <div className={cn('size-2 rounded-full', backgroundColor)}/>
    <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
  </div>
  )
}

const TransactionsTable = (props: TransactionTableProps) => {
    const { transactions = [] } = props;
    console.log('transactions: ', transactions);

    // data structure 1:

    // id: '1jzqm6Z96zsWGPoMp9l7tXdywwqoxacpdGgde',
    // name: 'CREDIT CARD 3333 PAYMENT *//',
    // paymentChannel: 'other',
    // type: 'other',
    // accountId: 'mpmGbMy8MmHjG56xd8V6CGB4RVlzoVSgwwJDw',
    // amount: 25,
    // pending: false,
    // category: 'Payment',
    // date: '2024-06-23',
    // image: null

    // data structure 2: 

    // {
    //   id: '7MzG1gl7agfbZZGZEX4gT9w4yG9xgAfdBR3Gd',
    //   name: 'SparkFun',
    //   paymentChannel: 'in store',
    //   type: 'in store',
    //   accountId: 'o3pKg694J6CDooVorE8NhjmxWxMzgdioqwW6G',
    //   amount: 89.4,
    //   pending: false,
    //   category: 'Food and Drink',
    //   date: '2024-06-19',
    //   image: null
    // }

  return (
    <Table>
  <TableHeader className="bg-[#f9f8fb]">
    <TableRow>
      <TableHead className="px-2">Transactions</TableHead>
      <TableHead className="px-2">Ammount</TableHead>
      <TableHead className="px-2">Status</TableHead>
      <TableHead className="px-2">Date</TableHead>
      <TableHead className="px-2 max-md-hidden">Channel</TableHead>
      <TableHead className="px-2 max-md-hidden">Category</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {transactions.map((transaction: Transaction) => {
      const status = getTransactionStatus(new Date(transaction.date));
      const amount = formatAmount(transaction.amount);
      const isDebit = transaction.type === 'in store' || transaction.type === 'other';
      const isCredit = transaction.type === 'online';

      return (
        <TableRow key={transaction.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
          <TableCell className="max-w-[250] pl-2 pr-10">
            <div className="flex items-center gap-3">
              <h1 className="text-14 truncate font-semibold text-[#344054]">{removeSpecialCharacters(transaction.name || '')}</h1>
            </div>
          </TableCell>
          { isDebit && <TableCell className={`pl-2 pr-10 font-semibold text-[#F04438]`}>{`${amount}`}</TableCell> }
          { isCredit && <TableCell className="pl-2 pr-10 font-semibold text-[#039855]">{amount}</TableCell> }
          <TableCell className="pl-2 pr-10"> <CategoryPill category={status}/></TableCell>
          <TableCell className="min-w-32 pl-2 pr-10">{transaction.date}</TableCell>
          <TableCell className="capitalize min-w-24 pl-2 pr-10">{transaction.paymentChannel}</TableCell>
          <TableCell className="max-md:hidden pl-2 pr-10">{transaction.category}</TableCell>
        </TableRow>
      );
    })}
  </TableBody>
</Table>
  )
}

export default TransactionsTable