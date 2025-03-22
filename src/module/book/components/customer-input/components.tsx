'use client'

import { FC, FocusEventHandler, useRef, useState } from "react"
import { CustomerInputProps } from "./props"
import { Input } from "@/components/inputs"
import { Loader } from "@/components/misc"
import { BriefCustomer } from "@/book/types/customer"
import { CustomerDetail } from "../customer-detail"

export const CustomerInput : FC<CustomerInputProps> = ({
    data,
    wrapperClassName,
    isLoading,
    onSelect,
    onBlur,
    onFocus,
    value,
    ...props
}) => {
    const [open, setOpen]   = useState(false)
    const blurTimeoutRef    = useRef<ReturnType<typeof setTimeout>>()

    const handleSelect = (customer : BriefCustomer) => {
        if (typeof onSelect == 'function') {
            onSelect(customer)
        }
    }

    const handleFocus : FocusEventHandler<HTMLInputElement> = (event) => {
        if (typeof onFocus == 'function') {
            onFocus(event)
        }

        clearTimeout(blurTimeoutRef.current)
        setOpen(true)

    }

    const handleBlur : FocusEventHandler<HTMLInputElement> = (event) => {
        if (typeof onBlur == 'function') {
            onBlur(event)
        }

        clearTimeout(blurTimeoutRef.current)
        blurTimeoutRef.current = setTimeout(() => {
            setOpen(false)
        }, 500)
    }

    return (
        <div 
            className={`${
                "position-relative"
            } ${
                wrapperClassName
            }`}
        >
            <Input
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                {...props}
            />
            { open ? (
                <div className="searchable-display shadow-sm rounded border border-grey-800">
                    { !value ? (
                        <div className="px-3 py-2 text-center text-grey-700">
                            Input to search customer
                        </div>
                    ) : isLoading ? (
                        <div className="px-3 py-2 d-flex align-items-center justify-content-center">
                            <div>
                                <Loader small className="me-2"/>
                                Loading...
                            </div>
                        </div>
                    ) : !data?.length ? (
                        <div className="px-3 py-2 text-center text-danger">
                            Unable to find customer
                        </div>
                    ) : data.map((customer) => (
                        <CustomerDetail
                            onClick={() => handleSelect(customer)}
                            className="cursor-pointer"
                            key={`customer-${customer.id}`}
                            customer={customer}
                        />
                    )) }
                </div>
            ) : (<></>) }
        </div>
    )
}