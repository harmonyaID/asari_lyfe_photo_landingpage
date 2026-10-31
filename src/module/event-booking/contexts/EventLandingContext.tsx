'use client'

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react"

export interface EventLandingContextType {
    expanded: boolean
    setExpanded: Dispatch<SetStateAction<boolean>>
}

export const EventLandingContext = createContext<EventLandingContextType|null>(null)
export const EventLandingProvider : FC<PropsWithChildren> = ({
    children
}) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <EventLandingContext.Provider
            value={{
                expanded,
                setExpanded
            }}
        >
            { children }
        </EventLandingContext.Provider>
    )
}

export const useEventLandingContext = () => {
    return useContext(EventLandingContext) as EventLandingContextType
}
