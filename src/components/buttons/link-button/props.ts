import { ComponentPropsWithoutRef } from "react"

export interface LinkButtonProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
    href    : string
    pill?   : boolean
}
