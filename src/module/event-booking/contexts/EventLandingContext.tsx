'use client'

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react"

export interface EventLandingContextType {
    folded: boolean
    setFolded: Dispatch<SetStateAction<boolean>>
    img: string
    setImg: Dispatch<SetStateAction<string>>
}

export const EventLandingContext = createContext<EventLandingContextType|null>(null)
export const EventLandingProvider : FC<PropsWithChildren> = ({
    children
}) => {
    const [folded, setFolded] = useState(true)
    const [img, setImg] = useState('')

    return (
        <EventLandingContext.Provider
            value={{
                folded, setFolded,
                img, setImg,
            }}
        >
            { children }
        </EventLandingContext.Provider>
    )
}

export const useEventLandingContext = () => {
    return useContext(EventLandingContext) as EventLandingContextType
}
