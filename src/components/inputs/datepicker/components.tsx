'use client';

import { FC, useEffect, useLayoutEffect, useRef } from "react"
import { DatePickerProps } from "./props"
import { Datepicker } from "vanillajs-datepicker"
import { DatepickerEvent } from "./types"

export const DatePicker : FC<DatePickerProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    required = false,
    onChange,
    ...props
}) => {

    const dateRef   = useRef<Datepicker>()
    const elemRef   = useRef<HTMLInputElement>(null)
    const changeRef = useRef(onChange)

    const inputId = id || `date-picker-${name}`

    useLayoutEffect(() => {
        changeRef.current = onChange
    })


    useEffect(() => {
        if (!elemRef.current) {
            return
        }

        dateRef.current = new Datepicker(elemRef.current, {
            buttonClass: 'btn',
            format: 'dd MM yyyy',
        })

        elemRef.current.addEventListener('changeDate', (event) => {
            const data = (event as DatepickerEvent).detail

            if (typeof changeRef.current == 'function') {
                changeRef.current({
                    name        : name,
                    value       : data.datepicker.getDate('dd MM yyyy'),
                })
            }
        })
    }, [])


    return (
        <div
            className={wrapperClassName}
        >
            { label ? (
                <label
                    htmlFor={inputId}
                    className="form-label"
                >
                    { label }
                    { required ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>) }
            <input
                ref={elemRef}
                id={inputId}
                name={name}
                onChange={() => {}}
                className={`form-control ${className}`}
                required={required}
                {...props}
            />
        </div>
    )
}