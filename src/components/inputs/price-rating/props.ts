import { InputChangeHandler } from "@/helpers/changeHandlers";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface PriceRatingProps extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'onChange' | 'type'> {
    label?              : ReactNode
    name                : string
    wrapperClassName?   : string
    onChange?           : InputChangeHandler
    error?              : string
}