import { InputChangeHandler } from "@/helpers/changeHandlers/types";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'onChange'> {
    label?              : ReactNode
    name                : string
    wrapperClassName?   : string
    onChange?           : InputChangeHandler
}