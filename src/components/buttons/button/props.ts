import { ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    pill?   : boolean
    outline?: boolean
}
