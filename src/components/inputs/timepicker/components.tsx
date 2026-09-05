'use client'

import { ChangeEventHandler, FC, FocusEventHandler, MouseEventHandler, useEffect, useMemo, useRef, useState } from "react"
import { TimeOptionProps, TimepickerProps } from "./props"

export const Timepicker : FC<TimepickerProps> = ({
    label,
    name,
    wrapperClassName = '',
    hint,
    value,
    required = false,
    readOnly = false,
    disabled = false,
    onChange,
}) => {

    const hourRef = useRef<HTMLInputElement|null>(null)
    const minuteRef = useRef<HTMLInputElement|null>(null)
    const onChangeRef = useRef(onChange)

    const preventBlur = useRef(false)
    
    const [open, setOpen] = useState(false)
    const [hour, setHour] = useState((new Date).getHours().toString().padStart(2, '0'))
    const [minute, setMinute] = useState((new Date).getMinutes().toString().padStart(2, '0'))

    const leaveTimeout = useRef<ReturnType<typeof setTimeout>|null>(null)

    const availableHours = useMemo(() => {
        const output = []
        for (let hour = 0; hour < 24; hour++) {
            output.push(hour.toString().padStart(2, '0'))
        }

        return output
    }, [])

    const availableMinutes = useMemo(() => {
        const output = []
        for (let minute = 0; minute < 60; minute++) {
            output.push(minute.toString().padStart(2, '0'))
        }

        return output
    }, [])

    const searchedHour = useMemo(() => hour.padStart(2, '0'), [hour])
    const searchedMinute = useMemo(() => minute.padStart(2, '0'), [minute])


    const handleClickContainer = () => {
        hourRef.current?.focus()
    }

    const handleChangeHour : ChangeEventHandler<HTMLInputElement> = (event) => {
        const input = event.target
        let value = input.value
        if (value == '') {
            setHour((prevState) => '')
            
            if (typeof onChangeRef.current == 'function') {
                onChangeRef.current({name, value: `${value}:${minute}`})
            }
            return
        }

        let valueNum = parseInt(value)

        if (valueNum > 23) {
            value = '23'
            valueNum = 23
        } else if (valueNum < 0) {
            value = '00'
            valueNum = 0
        }

        setHour((prevState) => value)
        
        if (typeof onChangeRef.current == 'function') {
            onChangeRef.current({name, value: `${value}:${minute}`})
        }

        if (value.length == 2) {
            minuteRef.current?.focus()
        }
    }

    const handleSelectHour = (selected: string) => {
        setHour(selected)
        hourRef.current?.focus()

        if (!minute) {
            setMinute('00')
        }

        if (typeof onChangeRef.current == 'function') {
            onChangeRef.current({name, value: `${selected}:${minute || '00'}`})
        }
    }

    const handleHourFocus : FocusEventHandler<HTMLInputElement> = (event) => {
        setOpen(true)
    }

    const handleHourBlur : FocusEventHandler<HTMLInputElement> = (event) => {
        const input = event.target
        let value = input.value

        if (value.length < 2) {
            value = value.padStart(2, '0')
            
            if (typeof onChangeRef.current == 'function') {
                onChangeRef.current({name, value: `${value}:${minute}`})
            }

            setHour((prevState) => value)
        }

        if (!preventBlur.current) {
            setOpen(false)
        }
    }

    const handleChangeMinute : ChangeEventHandler<HTMLInputElement> = (event) => {
        const input = event.target
        let value = input.value
        if (value == '') {
            setMinute('')
            return
        }

        let valueNum = parseInt(value)

        if (valueNum > 59) {
            value = '59'
            valueNum = 59
        } else if (valueNum < 0) {
            value = '00'
            valueNum = 0
        }

        setMinute(value)
        
        if (typeof onChangeRef.current == 'function') {
            onChangeRef.current({name, value: `${hour}:${value}`})
        }
    }

    const handleSelectMinute = (selected: string) => {
        setMinute(selected)
        minuteRef.current?.focus()
        
        if (typeof onChangeRef.current == 'function') {
            onChangeRef.current({name, value: `${hour}:${selected}`})
        }
    }
    
    const handleMinuteFocus : FocusEventHandler<HTMLInputElement> = (event) => {
        setOpen(true)
    }
    
    const handleMinuteBlur : FocusEventHandler<HTMLInputElement> = (event) => {
        const input = event.target
        let value = input.value

        if (value.length < 2) {
            value = value.padStart(2, '0')
            
            if (typeof onChangeRef.current == 'function') {
                onChangeRef.current({name, value: `${hour}:${value}`})
            }

            setMinute((prevState) => value)
        }

        if (!preventBlur.current) {
            setOpen(false)
        }
    }

    const handleDropdownEnter : MouseEventHandler<HTMLDivElement> = (event) => {
        if (leaveTimeout.current) {
            clearTimeout(leaveTimeout.current);
            leaveTimeout.current = null
        }

        preventBlur.current = true
    }

    const handleDropdownLeave : MouseEventHandler<HTMLDivElement> = (event) => {
        if (leaveTimeout.current) {
            return
        }

        leaveTimeout.current = setTimeout(() => {
            preventBlur.current = false
        }, 300)
    }


    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    useEffect(() => {
        if (!value) {
            setHour('')
            setMinute('')
            return
        }

        const parts = value?.split(':')
        if (parts.length == 2) {
            setHour(parts[0])
            setMinute(parts[1])
        } else {
            setHour('')
            setMinute('')
        }

    }, [value])

    return (
        <div
            className={wrapperClassName}
        >
            <label
                className={`${
                    "form-label"
                } ${
                    readOnly ? 'text-primary fw-semibold' : ''
                } ${
                    !label ? 'text-capitalize' : ''
                }`}
                onClick={handleClickContainer}
            >
                { label || name }
                { required && !readOnly ? <span className="text-danger">*</span> : <></> }
            </label>
            <div className="time-picker">
                <div className="time-picker-input-container"
                    onClick={handleClickContainer}
                >
                    <input 
                        ref={hourRef}
                        type="number"
                        min={0}
                        max={23}
                        value={hour}
                        onChange={handleChangeHour}
                        onFocus={handleHourFocus}
                        onBlur={handleHourBlur}
                        readOnly={readOnly}
                        disabled={disabled}
                    />
                    <span>:</span>
                    <input 
                        ref={minuteRef}
                        type="number"
                        min={0}
                        max={59}
                        value={minute}
                        onChange={handleChangeMinute}
                        onFocus={handleMinuteFocus}
                        onBlur={handleMinuteBlur}
                        readOnly={readOnly}
                        disabled={disabled}
                    />
                </div>
                <div 
                    className={`${
                        "time-picker-dropdown py-2 rounded bg-white shadow-sm"
                    } ${
                        open ? 'open' : ''
                    }`}

                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                >
                    <div className="time-container">
                        { availableHours.map((hour) => (
                            <TimeOption
                                key={`hour-${hour}`}
                                value={hour}
                                focus={hour == searchedHour}
                                onClick={handleSelectHour}
                            />
                        )) }
                    </div>
                    <div className="time-container">
                        { availableMinutes.map((minute) => (
                            <TimeOption
                                key={`minute-${minute}`}
                                value={minute}
                                focus={minute == searchedMinute}
                                onClick={handleSelectMinute}
                            />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}

const TimeOption : FC<TimeOptionProps> = ({
    value,
    focus,
    onClick
}) => {
    const elementRef = useRef<HTMLDivElement>(null)

    const handleClick : MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (typeof onClick == 'function') {
            onClick(value)
        }
    }

    useEffect(() => {
        if (focus) {
            elementRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [focus])

    return (
        <div 
            ref={elementRef}
            onClick={handleClick}
            className={`${
                "text-center"
            } ${
                focus ? 'focus fw-semibold' : ''
            }`}
        >
            { value }
        </div>
    )
}
