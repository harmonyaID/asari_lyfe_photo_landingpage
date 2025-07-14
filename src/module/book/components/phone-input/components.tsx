'use client'

import { FC, useEffect, useRef, useState } from "react"
import { PhoneInputProps } from "./props"
import { useGetCustomerByPhone } from "@/book/hooks/useGetCustomerByPhone"
import { CustomerInput } from "../customer-input"

export const PhoneInput : FC<PhoneInputProps> = ({
    value,
    ...props
}) => {
    const [filter, setFilter]   = useState({ search: '', limit: 10 })
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const { data, isLoading } = useGetCustomerByPhone(filter)
    
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