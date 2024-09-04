import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"

const PaymentFormInput = (props: PaymentFormInputProps) => {
    const { control, formLabel, formControlPlaceHolder, name } = props;
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="border-t border-gray-200">
            <div className="payment-transfer_form-item pb-6 pt-5">
            <div className="payment-transfer_form-content">
                <FormLabel className="text-14 font-medium text-gray-700">
                Transfer Note (Optional)
                </FormLabel>
                <FormDescription className="text-12 font-normal text-gray-600">
                    {formLabel}
                </FormDescription>
                <div className="flex w-full flex-col">
                <FormControl>
                    <Textarea
                    placeholder={formControlPlaceHolder}
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
  )
}

export default PaymentFormInput