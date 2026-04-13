import { InputChangeHandler } from "@/helpers/changeHandlers";
import { ComponentPropsWithoutRef } from "react";

export interface TextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'name' | 'onChange'> {
    label?              : string
    name                : string
    wrapperClassName?   : string
    onChange?           : InputChangeHandler
}