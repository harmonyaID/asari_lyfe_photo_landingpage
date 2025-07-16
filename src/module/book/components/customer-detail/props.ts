import { BriefCustomer } from "@/book/types/customer";
import { MouseEventHandler } from "react";

export interface CustomerDetailProps {
    customer    : BriefCustomer
    onClick?    : MouseEventHandler<HTMLDivElement>
    onClose?    : MouseEventHandler<HTMLButtonElement>
    closable?   : boolean
    className?  : string
}