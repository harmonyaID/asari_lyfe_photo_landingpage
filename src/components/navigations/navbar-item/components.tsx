'use client'

import { NavbarContext } from "@/contexts/navbar-context"
import { NavbarContextType } from "@/contexts/navbar-context/types"
import Link from "next/link"
import { FC, useContext, useMemo } from "react"
import { NavbarItemProps } from "./props"
import { usePathname } from "next/navigation"

export const NavbarItem : FC<NavbarItemProps> = ({
    id,
    label,
    href
}) => {
    const { active } = useContext(NavbarContext) as NavbarContextType
    const pathName = usePathname()

    const url = useMemo(() => {
        if (href) {
            return href
        }

        if (pathName == '/') {
            return `#${id}`
        }

        return `/#${id}`
    }, [href, id, pathName])

    const isActive = useMemo(() => {
        if (href) {
            return pathName.startsWith(href)
        }

        if (pathName != '/') {
            return false
        }

        return active == id
    }, [active, pathName, href, id])

    return (
        <Link 
            className={`${
                "navbar-link"
            } ${
                isActive ? 'active' : ''
            }`}
            href={url}
        >
            { label }
        </Link>
    )
}