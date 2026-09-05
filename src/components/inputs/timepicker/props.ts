import { InputChangeHandler } from "@/helpers/changeHandlers/types";
import { ComponentPropsWithoutRef } from "react";

export interface TimepickerProps extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'onChange' | 'min' | 'max' | 'value'> {
    label?              : string
    name                : string
    wrapperClassName?   : string
    onChange?           : InputChangeHandler
    hint?               : string
    value?              : string
}

export interface TimeOptionProps {
    value   : string
    focus   : boolean
    onClick?: (selected: string) => void
}
