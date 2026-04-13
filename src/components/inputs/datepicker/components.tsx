'use client'

import { FC, useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { DatePickerProps } from "./props"
import { Datepicker } from "vanillajs-datepicker"
import { DatepickerEvent } from "./types"
import dayjs from "dayjs"

export const DatePicker : FC<DatePickerProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    withLabel = false,
    required = false,
    maxNumberOfDates = 1,
    datesDisabled = [],
    onChange,
    value,
    error = '',
    ...props
}) => {
    const dateRef   = useRef<Datepicker>()
    const elemRef   = useRef<HTMLInputElement>(null)
    const changeRef = useRef(onChange)

    const inputId = id || `date-picker-${name}`

    const inputLabel = useMemo(() => {
        if (!withLabel && !label) {
            return ''
        }

        if (label) {
            return label
        }

        return 'Date'
    }, [label,  withLabel])

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

        if (value) {
            const date = dayjs(value as string, 'dd MM yyyy');
            dateRef.current.setDate(date.toDate())
            dateRef.current.refresh()
        }

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
    }, [onChange])


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
    
    useEffect(() => {
        if (!dateRef.current) {
            return
        }

        if (dateRef.current.getDate('dd MM yyyy') == value) {
            return
        }

        const date = dayjs(value as string, 'dd MM yyyy');
        dateRef.current.setDate(date.toDate())
        dateRef.current.refresh()
    }, [value])

    useEffect(() => {
        if (!error || !elemRef.current) {
            return
        }

        elemRef.current.focus()

        const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(elemRef.current, {
            title: error,
            placement: 'top',
            trigger: 'manual',
            customClass: 'error-tooltip',
        })

        tooltip.show()

        return () => {
            tooltip.dispose()
        }

    }, [error])


    return (
        <div
            className={wrapperClassName}
        >
            { inputLabel ? (
                <label
                    htmlFor={inputId}
                    className="form-label"
                >
                    { inputLabel }
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
