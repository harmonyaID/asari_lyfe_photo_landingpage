"use client"

import { ArrowBackIcon } from "@/components/icons"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { BackButtonProps } from "./props"

export const BackButton : FC<BackButtonProps> = ({
    className = '',
    role = 'navigation',
    ...props
}) => {
    const router = useRouter()

    const handleClick = () => {
        router.back()
    }

    return (
        <ArrowBackIcon
            onClick={handleClick}
            role={role}
            tabIndex={0}
            className={`${
                "cursor-pointer"
            } ${
                className
            }`}
            {...props}
        />
    )
}
