import { BaseModel } from "@/types/models"
import { Schedule } from "./schedule"
import { Language } from "@/module/misc/types"
import { BriefCustomer } from "./customer"

export interface Booking extends BaseModel {
    number          : string
    source          : string
    schedule?       : Schedule
    name            : string
    email?          : string
    phone           : string
    roomNumber?     : string
    confirmationMsg?: {
        html        : string
        formatted   : string
        fullyFilled?: boolean
    }
    branchPhone?    : string
}

export interface CreateBookingFormdata {
    source              : string
    recaptchaToken      : string
    recaptchaAction     : string
    date                : string
    checkoutDate        : string
    customerNumber      : string
    locationId          : number
    scheduleId          : number
    name                : string
    email               : string
    phone               : string
    roomNumber          : string
    preferredLanguage?  : Language
    preferredLanguageId?: number
    compilance          : boolean
    paxQty              : number
}

export interface CancelBookingFormdata {
    code                : string
    recaptchaToken      : string
    recaptchaAction     : string
    reason              : string
}

export interface RescheduleBookingFormdata {
    code                : string
    date                : string
    scheduleId          : number
    recaptchaToken      : string
    recaptchaAction     : string
    reason              : string
}

export interface DeleteBookingAdjustmentFormdata {
    code                : string
    recaptchaToken      : string
    recaptchaAction     : string
}

export interface BookingFeedbackFormdata {
    code: string
    experienceRating: number
    photographerRating: number
    adminRating: number
    photoQualityRating: number
    priceRatingId: number
    photoFormatIds?: number[]
    recommendationScore: number
    suggestion: string
    uploadAllowed: boolean
}

export interface BookingFeedbackFormdataWithToken extends BookingFeedbackFormdata {
    recaptchaToken: string
    recaptchaAction: string
}
