import { BaseModel } from "@/types/models"

export interface Schedule extends BaseModel {
    fromTime        : string
    toTime          : string
    date            : string
    quota           : number
    bookingCount?   : number
    isActive        : boolean
    isAvailable     : boolean
}
