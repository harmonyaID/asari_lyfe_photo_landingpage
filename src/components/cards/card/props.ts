import { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
    imgUrl?: string
    className?: string
    leftImg?: boolean
}