import { CustomSearchableSelectProps } from "@/components/inputs/searchable-select";
import { Location } from "@/location/types";

export interface LocationSelectProps extends CustomSearchableSelectProps {
    name?   : string
    value?  : number | number[] | Location | Location[]
}
