import { PropsWithChildren } from "react";

export interface ModalProps extends Omit<PropsWithChildren, 'id'> {
    className?      : string
    title?          : string
    subTitle?       : string
    size?           : 'small' | 'large'
    onShow?         : () => void
    onHide?         : () => void
    preventClose?   : boolean
    open?           : boolean
}
