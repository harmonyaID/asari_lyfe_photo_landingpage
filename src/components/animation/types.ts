export type Animations =
    | "slide-to-right"
    | "slide-to-left"
    | "slide-to-up"
    | "slide-to-bottom"
    | "fade-in"
    | "lighten"

export type AnimationTiming = 
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"

export interface AnimationObserverContextType {
    observe: (target: Element) => void
}