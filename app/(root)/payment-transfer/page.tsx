import HeaderBox from "@/components/ui/HeaderBox"
import PaymentTransferForm from "@/components/ui/PaymentTransferForm"
import { getAccounts } from "@/lib/actions/bank.actions";
import { isLogged } from "@/lib/auth/actions";

const PaymentTransfer = async () => {
  const loggedUser = await isLogged();
  const accounts = await getAccounts({userId: loggedUser?.$id});
  if(!accounts) {
    return;
  }
  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Please provide any notes related to the payment"/>
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data} />
      </section>
    </section>
  )
}

export default PaymentTransfer