import { Booking } from "@/book/types"

export interface SelfAdjustmentProps {
    number  : string
    booking?: Booking
    url     : string
    code    : string
}