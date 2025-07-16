import { BriefCustomer } from "@/book/types/customer";
import { InputProps } from "@/components/inputs/input";

export interface NameInputProps extends Omit<InputProps, 'onSelect'> {
    onSelect?: (customer: BriefCustomer) => void
}