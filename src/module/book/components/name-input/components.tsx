'use client'

import { FC, useEffect, useRef, useState } from "react"
import { NameInputProps } from "./props"
import { useGetCustomerByName } from "@/book/hooks/useGetCustomerByName"
import { CustomerInput } from "../customer-input"

export const NameInput : FC<NameInputProps> = ({
    value,
    ...props
}) => {
    const [filter, setFilter]   = useState({ search: '', limit: 10 })
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const { data, isLoading } = useGetCustomerByName(filter)
    
    useEffect(() => {
        clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            setFilter((prevState) => ({
                ...prevState,
                search: (value as string) || ''
            }))
        }, 500)
    }, [value])

    return (
        <CustomerInput
            data={data?.result || undefined}
            isLoading={isLoading}
            value={value}
            {...props}
        />
    )
}