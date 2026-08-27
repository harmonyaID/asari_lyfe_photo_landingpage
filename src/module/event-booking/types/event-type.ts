import { BaseGlobalModel } from "@/types/models";

export interface EventType extends BaseGlobalModel {
    name        : string
    slug        : string
    description : string
    thumbnail   : string
}