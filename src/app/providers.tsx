'use client'

import { AnimationObserverProvider } from "@/components/animation"
import { NavbarProvider } from "@/contexts/navbar-context"
import { FC, PropsWithChildren, useEffect } from "react"

export const LandingProvider : FC<PropsWithChildren> = ({
    children
}) => {
    useEffect(() => {
        document.body.classList.add('landing')

        return () => {
            document.body.classList.remove('landing')
        }
    }, [])

    return (
        <AnimationObserverProvider>
            <NavbarProvider>
                { children }
            </NavbarProvider>
        </AnimationObserverProvider>
    )
}