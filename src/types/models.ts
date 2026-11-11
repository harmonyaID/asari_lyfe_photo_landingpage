import { Location } from "@/location/types"

export interface CreatedBy {
    id  : number
    name: string
}

export interface BaseModel extends Record<string, any> {
    id          : number|string
    location?   : Location
    createdBy?  : CreatedBy
    createdAt?  : string
}

export interface BaseGlobalModel extends Record<string, any> {
    id          : number
    createdBy?  : CreatedBy
    createdAt?  : string
}

export interface BaseModelWithName extends BaseModel {
    name : string
}

export interface BaseModelWithCode extends BaseModel {
    code : string
}

export type BaseModelWithNameCode = BaseModelWithName & BaseModelWithCode
