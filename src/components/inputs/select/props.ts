import { InputChangeHandler } from "@/helpers/changeHandlers";
import { ComponentPropsWithoutRef } from "react";
import { SelectOptionType } from "./types";

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'name' | 'onChange' | 'children'> {
    name                : string
    label?              : string
    onChange?           : InputChangeHandler
    wrapperClassName?   : string
    options?            : string[] | SelectOptionType[]
}
