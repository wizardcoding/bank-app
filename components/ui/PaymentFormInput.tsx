import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const PaymentFormInput = (props: PaymentFormInputProps) => {
    const { control, formLabel, formControlPlaceHolder, name } = props;
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="border-t border-gray-200">
            <div className="payment_transfer_form-item py-5">
            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                {formLabel}
            </FormLabel>
            <div className="flex w-full flex-col">
                <FormControl>
                <Input
                    placeholder={formControlPlaceHolder}
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
  )
}

export default PaymentFormInput