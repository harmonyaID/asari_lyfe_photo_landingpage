import { InputChangeHandler } from "@/helpers/changeHandlers";
import { ReactNode } from "react";

export interface RatingInputProps {
    label?: ReactNode
    name: string
    value?: number
    className?: string
    wrapperClassName?: string
    onChange?: InputChangeHandler
    error?: string
    required?: boolean
}