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
