import { CustomSearchableSelectProps } from "@/components/inputs/searchable-select"
import { Language } from "../../types"

export interface LanguageSelectProps extends CustomSearchableSelectProps {
    name?   : string
    value?  : number | number[] | Language | Language[]
}