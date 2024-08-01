import { BaseModelWithNameCode } from "@/types/models"

export interface Location extends BaseModelWithNameCode {
    description : string
    email?      : string
    phone       : string
    address     : string
    logo?       : string
    isActive    : boolean
}