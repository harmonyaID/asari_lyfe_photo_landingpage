export type NavItems = 
    | "home"
    | "intro"
    | "portfolio"
    | "partner"
    | "contact"

export interface NavbarContextType {
    active      : NavItems
    observe     : (element: Element) => void
    unobserve   : (element: Element) => void
}