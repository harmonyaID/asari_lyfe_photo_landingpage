import { BaseModelWithCode } from "@/types/models";

export interface PublicLink extends BaseModelWithCode {
    url         : string
    expiredAt   : string
    isActive    : boolean
    type        : {
        id      : number
        name    : string
    }
}