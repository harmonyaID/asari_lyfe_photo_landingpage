import { Booking } from "@/book/types"

export interface RescheduleFormProps {
    number  : string
    booking?: Booking
    url     : string
    code    : string
    onSuccess?: () => void
}