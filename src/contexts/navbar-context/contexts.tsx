'use client'

import { createContext, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react"
import { NavbarContextType, NavItems } from "./types"

export const NavbarContext = createContext<NavbarContextType | null>(null)
export const NavbarProvider : FC<PropsWithChildren> = ({ children }) => {
    const [active, setActive] = useState<NavItems>('home')
    const [observer, setObserver] = useState<IntersectionObserver>()

    const handleChange = useCallback<IntersectionObserverCallback>((entries, observer) => {
        entries.forEach((entry) => {
            const target = entry.target as HTMLElement

            let ratio = .8
            if (target.dataset.ratio) {
                ratio = parseFloat(target.dataset.ratio)
            } 

            if (entry.intersectionRatio >= ratio) {
                setActive(target.dataset.id as NavItems)
            }
        })
    }, [setActive])

    const observe = useCallback((target: Element) => {
        if (!observer) {
            return
        }

        observer.observe(target)
    }, [observer])

    const unobserve = useCallback((target: Element) => {
        if (!observer) {
            return
        }

        observer.unobserve(target)
    }, [observer])

    useEffect(() => {
        setObserver(new IntersectionObserver(handleChange, {
            root        : null,
            rootMargin  : "0px",
            threshold   : [.1, .15, .2, .25, .3, .35, .4, .45, .5, .55, .6, .65, .7, .75, .8, .85, .9, .95, 1]
        }))

        return () => {
            if (!observer) {
                return
            }

            observer.disconnect()
            setObserver(undefined)
        }
    }, [])

    return (
        <NavbarContext.Provider
            value={{
                active,
                observe,
                unobserve
            }}
        >
            { children }
        </NavbarContext.Provider>
    )
}