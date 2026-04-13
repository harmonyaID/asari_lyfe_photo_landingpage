'use client'

import { FC, useEffect } from "react"

export const FormLayoutProvider : FC = () => {
    useEffect(() => {
        window.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        document.body.classList.add('d-flex')

        return () => {
            document.body.classList.remove('d-flex')
        }
    }, [])

    return (
        <></>
    )
}