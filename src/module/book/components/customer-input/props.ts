import { BriefCustomer } from "@/book/types/customer";
import { InputProps } from "@/components/inputs/input";

export interface CustomerInputProps extends Omit<InputProps, 'onSelect'> {
    data?       : BriefCustomer[]
    isLoading?  : boolean
    onSelect?   : (customer: BriefCustomer) => void
}