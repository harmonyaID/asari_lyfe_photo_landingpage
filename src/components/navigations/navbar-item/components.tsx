'use client'

import { NavbarContext } from "@/contexts/navbar-context"
import { NavbarContextType } from "@/contexts/navbar-context/types"
import Link from "next/link"
import { FC, useContext } from "react"
import { NavbarItemProps } from "./props"

export const NavbarItem : FC<NavbarItemProps> = ({
    id,
    label,
}) => {
    const { active } = useContext(NavbarContext) as NavbarContextType

    return (
        <Link 
            className={`${
                "navbar-link"
            } ${
                active == id ? 'active' : ''
            }`}
            href={`#${id}`}
        >
            { label }
        </Link>
    )
}