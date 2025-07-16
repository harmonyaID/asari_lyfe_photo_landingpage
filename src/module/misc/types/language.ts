import { BaseModel } from "@/types/models";

export interface Language extends BaseModel {
    name    : string
    code    : string
    default : boolean
    isActive: boolean
}