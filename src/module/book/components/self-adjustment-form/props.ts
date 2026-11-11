import { Booking } from "@/book/types"
import { ComponentWithLogo } from "@/types/components"

export interface SelfAdjustmentProps extends ComponentWithLogo {
    number  : string
    booking?: Booking
    url     : string
    code    : string
}