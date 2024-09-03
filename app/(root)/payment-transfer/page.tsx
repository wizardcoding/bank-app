import HeaderBox from "@/components/ui/HeaderBox"
import PaymentTransferForm from "@/components/ui/PaymentTransferForm"

const PaymentTransfer = () => {
  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Please provide any notes related to the payment"/>
      <section className="size-full pt-5">
        {/* <PaymentTransferForm/> */}
      </section>
    </section>
  )
}

export default PaymentTransfer