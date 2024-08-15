'use client';

import { FC, useEffect, useLayoutEffect, useRef } from "react"
import { DatePickerProps } from "./props"
import { DatepickerEvent } from "./types"
import { Datepicker } from "vanillajs-datepicker";

export const DatePicker : FC<DatePickerProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    required = false,
    maxNumberOfDates = 1,
    datesDisabled = [],
    onChange,
    ...props
}) => {

    const dateRef   = useRef<Datepicker>()
    const elemRef   = useRef<HTMLInputElement>(null)
    const changeRef = useRef(onChange)

    const inputId = id || `date-picker-${name}`

    const handleRenderPicker = async () => {
        if (!elemRef.current) {
            return
        }

        const { Datepicker } = await import("vanillajs-datepicker")

        dateRef.current = new Datepicker(elemRef.current, {
            buttonClass: 'btn',
            format: 'dd MM yyyy',
            minDate: new Date,
            maxNumberOfDates: maxNumberOfDates,
            clearButton     : maxNumberOfDates > 1,
            datesDisabled   : datesDisabled,
            autohide        : true
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
    }

    useLayoutEffect(() => {
        changeRef.current = onChange
    })


    useEffect(() => {
        handleRenderPicker()
    }, [])

    
    useEffect(() => {
        if (!dateRef.current) {
            return
        }

        dateRef.current.setOptions({
            maxNumberOfDates: maxNumberOfDates,
            clearButton     : maxNumberOfDates > 1,
        })
    }, [maxNumberOfDates])

    useEffect(() => {
        if (!dateRef.current) {
            return
        }

        dateRef.current.setOptions({
            datesDisabled: datesDisabled
        })

        dateRef.current.refresh()
    }, [datesDisabled])


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