export interface CreateBookingFormdata {
    recaptchaToken  : string
    recaptchaAction : string
    date            : string
    time            : string
    name            : string
    email           : string
    phone           : string
    packageId       : number
    location        : string
    notes           : string
    compilance      : boolean
}