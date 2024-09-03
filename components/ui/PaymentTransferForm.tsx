"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { createTransfer } from "@/lib/server/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId, PaymentTransferFormSchema } from "@/lib/utils";
import { BankDropdown } from "@/components/ui/BankDropdown";
import { useRouter } from "next/navigation";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const PaymentTransferForm = (props: PaymentTransferFormProps) => {
    const { accounts } = props;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof PaymentTransferFormSchema>>({
      resolver: zodResolver(PaymentTransferFormSchema),
      defaultValues: {
        name: "",
        email: "",
        amount: "",
        senderBank: "",
        sharableId: "",
      },
    });
    const submit = async(data: z.infer<typeof PaymentTransferFormSchema>) => {
      setIsLoading(true);
      try {
        const reveiverAccountId = decryptId(data.sharableId);
        const receiverBank = await getBankByAccountId({
          accountId: reveiverAccountId,
        });
        const senderBank = await getBank({ documentId: data.senderBank});
        const transferParams = {
          sourceFundingSourceUrl: senderBank.fundingSourceUrl,
          destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
          amount: data.amount,
        };
        const transfer = createTransfer(transferParams);
        if(transfer !== null) {
          const transaction = {
            name: data.name,
            amount: data.amount,
            senderId: senderBank.userId.$id,
            senderBankId: senderBank.$id,
            receiverId: receiverBank.userId.$id,
            receiverBankId: receiverBank.$id,
            email: data.email,
          };
          const newTransaction = await createTransaction(transaction);

          if(newTransaction !== null) {
            form.reset();
            router.push("/");
          }
        }
      } catch (error) {
        console.error("error when submiting a transfer request: ", error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Select the bank account you want to transfer funds from.
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-12 fornt-normal text-gray-600">
                    Please Provide any aditional information or instructions
                  </FormDescription>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Textarea
                        placeholder="Write a short note here"
                        className="input-class"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-12 text-red-500"/>
                  </div>
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank Accout Details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank accout details of the recipent
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment_transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Email Address
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: john@gmail.com"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sharableId"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment_transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Receiver&apos;s Plaid Sharable Id
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment_transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin"/>
                {` Sending...`}
              </>
            ): (
              <>
                {`Transfer Funds`}
              </>
            )}
          </Button>

        </div>
      </form>
    </Form>
  );
}

export default PaymentTransferForm