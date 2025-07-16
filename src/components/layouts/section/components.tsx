'use client'

import { FC, HTMLAttributes, useContext, useEffect, useRef } from "react";
import { SectionProps } from "./props";
import { NavbarContext } from "@/contexts/navbar-context";
import { NavbarContextType } from "@/contexts/navbar-context/types";

export const Section : FC<SectionProps> = ({
    id,
    observable = false,
    ratio,
    ...props
}) => {
    const elementRef = useRef<HTMLElement>(null)
    const { observe, unobserve } = useContext(NavbarContext) as NavbarContextType

    useEffect(() => {
        if (!id) {
            return
        }
        if (!elementRef.current) {
            return
        }

        if (observable) {
            observe(elementRef.current)
        } else {
            unobserve(elementRef.current)
        }

    }, [observable, id, observe, unobserve])

    return (
        <section
            ref={elementRef}
            id={id}
            data-id={id}
            data-ratio={ratio ? `${ratio}` : ''}
            {...props as unknown as HTMLAttributes<HTMLElement>}
        />
    )
}