import { PropsWithChildren } from "react";
import { Animations, AnimationTiming } from "./types";

export interface AnimationProps extends PropsWithChildren {
    animation?          : Animations
    timing?             : AnimationTiming
    className?          : string
    wrapperClassName?   : string
    delay?              : number
    show?               : boolean
}