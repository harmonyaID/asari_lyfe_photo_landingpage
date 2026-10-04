export interface CreateBookingFormdata {
    recaptchaToken  : string
    recaptchaAction : string
    date            : string
    source          : string
    timezone        : string
    time            : string
    name            : string
    email           : string
    phone           : string
    packageId       : number
    eventTypeId     : number
    location        : string
    notes           : string
    compilance      : boolean
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
