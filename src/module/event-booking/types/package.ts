import { BaseGlobalModel } from "@/types/models"
import { EventType } from "./event-type"


export interface Currency extends BaseGlobalModel{
    name            : string
    abbreviation    : string
    symbol?         : string
    isActive        : boolean
}

interface PackageComplimentary extends BaseGlobalModel {
    name    : string
    ordering: number
}

export interface Package extends BaseGlobalModel{
    name            : string
    description     : string
    ordering        : number
    price           : number
    thumbnail       : string
    eventType       : EventType
    currency        : Currency
    complimentaries?: PackageComplimentary[]
}
