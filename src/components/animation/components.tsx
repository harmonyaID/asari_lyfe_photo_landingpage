'use client'

import { FC, useContext, useEffect, useRef } from "react"
import { AnimationProps } from "./props"
import { AnimationObserverContext } from "./contexts"
import { AnimationObserverContextType } from "./types"

export const Animation : FC<AnimationProps> = ({
    animation           = 'fade-in',
    timing              = 'ease-out',
    className           = '',
    wrapperClassName    = '',
    delay               = 0,
    show                = false,
    children
}) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const { observe } = useContext(AnimationObserverContext) as AnimationObserverContextType

    useEffect(() => {
        if (!elementRef.current) {
            return
        }

        observe(elementRef.current)
    }, [observe])

    useEffect(() => {
        if (!elementRef.current) {
            return
        }

        const child = elementRef.current.firstElementChild as HTMLElement

        if (!delay) {
            if (show) {
                child.classList.add('active')
            } else {
                child.classList.remove('active')
            }
            return
        }

        setTimeout(() => {
            if (show) {
                child.classList.add('active')
            } else {
                child.classList.remove('active')
            }
        }, delay)
    }, [show])

    return (
        <div
            ref={elementRef}
            data-anim-delay={delay}
            data-anim-show={show ? 1 : 0}
            className={wrapperClassName}
        >
            <div 
                className={`${
                    animation
                } ${
                    `transition-${timing}`
                } ${
                    className
                }`}
            >
                { children }
            </div>
        </div>
    )
}