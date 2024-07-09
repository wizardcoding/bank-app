import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Field = (props: formFieldProps) =>  {
  const {control, label, placeholder, name} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
          <div className="form-item">
              <FormLabel className="from-label mb-1 ml-1">
                  {label}
              </FormLabel>
              <div className="flex w-full flex-col">
                  <FormControl>
                      <Input 
                          placeholder={placeholder}
                          className="input-class"
                          type={ name === 'password' ? 'password' : 'text' }
                          { ...field }
                      />
                  </FormControl>
                  <FormMessage className="form-message mt-3 ml-1"/>
              </div>
          </div>
      )}
    />
  )
}

export default Field