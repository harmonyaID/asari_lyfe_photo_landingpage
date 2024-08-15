import { BaseModel } from "@/types/models"
import { Schedule } from "./schedule"

export interface Booking extends BaseModel {
    number            : string
    source            : string
    schedule?         : Schedule
    name              : string
    email?            : string
    phone             : string
    roomNumber?       : string
}

export interface CreateBookingFormdata {
    source          : string
    recaptchaToken  : string
    recaptchaAction : string
    date            : string
    locationId      : number
    scheduleId      : number
    name            : string
    email           : string
    phone           : string
    roomNumber      : string
    compilance      : boolean
}
