import { BriefCustomer } from "@/book/types/customer";
import { InputProps } from "@/components/inputs/input";

export interface PhoneInputProps extends Omit<InputProps, 'onSelect'> {
    onSelect?: (customer: BriefCustomer) => void
}