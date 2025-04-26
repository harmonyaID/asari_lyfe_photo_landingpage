'use client';

import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AnimationObserverContextType } from "./types";

export const AnimationObserverContext = createContext<AnimationObserverContextType | null>(null)
export const AnimationObserverProvider : FC<PropsWithChildren> = ({ children }) => {
    const [observer, setObserver] = useState<IntersectionObserver>()

    const handleChange = useCallback<IntersectionObserverCallback>((entries, observer) => {
        entries.forEach((entry) => {
            const target    = entry.target as HTMLElement
            const child     = target.firstElementChild as HTMLElement

            if (target.dataset.animShow == '1') {
                return
            }

            if (entry.intersectionRatio <= .1 && entry.boundingClientRect.y >= window.innerHeight * .9) {
                if (target.dataset.animTimeoutId) {
                    const timeoutId = parseInt(target.dataset.animTimeoutId)
                    clearTimeout(timeoutId)
                }

                child.classList.remove('active')
                return
            }

            if (entry.intersectionRatio < .8) {
                return
            }

            if (!target.dataset.animDelay) {
                child.classList.add('active')
                return
            }

            const delay = parseInt(target.dataset.animDelay)
            const timeoutId = setTimeout(() => {
                child.classList.add('active')
            }, delay)

            target.setAttribute('data-anim-timeout-id', `${timeoutId}`)
        })
    }, [])

    const observe = useCallback((target: Element) => {
        if (!observer) {
            return
        }

        observer.observe(target)
    }, [observer])

    useEffect(() => {
        setObserver(new IntersectionObserver(handleChange, {
            root        : null,
            rootMargin  : "0px",
            threshold   : [.1, .8, 1],
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
        <AnimationObserverContext.Provider
            value={{
                observe
            }}
        >
            { children }
        </AnimationObserverContext.Provider>
    )
}