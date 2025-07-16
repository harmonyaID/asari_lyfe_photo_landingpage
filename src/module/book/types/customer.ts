import { BaseModel } from "@/types/models";

export interface BriefCustomer extends Omit<BaseModel, 'location'> {
    name    : string
    phone   : string
    date    : string
    location: string
}