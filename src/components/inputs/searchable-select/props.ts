import { BaseModel } from "@/types/models";
import { SelectProps } from "../select";
import { ReactNode } from "react";

export interface SearchableSelectProps extends Omit<SelectProps, 'value' | 'options'> {
    multiple?           : boolean
    data                : BaseModel[]
    value?              : number | number[] | BaseModel | BaseModel[]
    returnsObject?      : boolean
    search?             : string
    itemLabelKey        : string
    onSearch?           : (value: string) => any
    render?             : (item : BaseModel | any) => ReactNode
    loading?            : boolean
    emptyMessage?       : string
    notFoundMessage?    : string
    searchPlaceholder?  : string
    hideSelected?       : boolean
    hint?               : string
    error?              : string
}

export type CustomSearchableSelectProps = Omit<SearchableSelectProps, 'name' | 'data' | 'itemLabelKey' | 'loading'>
