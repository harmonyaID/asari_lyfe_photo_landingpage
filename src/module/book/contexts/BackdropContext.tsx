'use client'

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState } from "react";

export interface BackdropContextType {
    img: string
    setImg: Dispatch<SetStateAction<string>>
}

export const BackdropContext = createContext<BackdropContextType|null>(null)
export const BackdropProvider : FC<PropsWithChildren> = ({ children }) => {
    const [img, setImg] = useState('')

    return (
        <BackdropContext.Provider
            value={{
                img, setImg
            }}
        >
            { children }
        </BackdropContext.Provider>
    )
}