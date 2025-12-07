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

    const handleChange = (event : any) => {
        if (typeof changeRef.current != 'function') {
            return
        }

        const data = (event as DatepickerEvent).detail
        changeRef.current({
            name        : name,
            value       : data.datepicker.getDate('dd MM yyyy'),
        })
    }

    useLayoutEffect(() => {
        changeRef.current = onChange
    }, [onChange])


    useEffect(() => {
        if (!elemRef.current) {
            return
        }

        dateRef.current = new Datepicker(elemRef.current, {
            buttonClass     : 'btn',
            format          : 'dd MM yyyy',
            minDate         : new Date,
            maxNumberOfDates: maxNumberOfDates,
            clearButton     : maxNumberOfDates > 1,
            datesDisabled   : datesDisabled,
            autohide        : maxNumberOfDates == 1,
        })

        if (value) {
            dateRef.current.setDate(value)
        }

        elemRef.current.addEventListener('changeDate', handleChange)
        
        const date      = dateRef.current
        const element   = elemRef.current
        
        return () => {
            element?.removeEventListener('changeDate', handleChange)
            date?.destroy()
        }
    }, [])

    useEffect(() => {
        if (!dateRef.current) {
            return
        }

        dateRef.current.setOptions({
            maxNumberOfDates: maxNumberOfDates,
            clearButton     : maxNumberOfDates > 1,
            autohide        : maxNumberOfDates == 1,
        })
    }, [maxNumberOfDates])

    useEffect(() => {
        if (!dateRef.current) {
            return
        }

        dateRef.current.setOptions({
            datesDisabled: datesDisabled
        })
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
