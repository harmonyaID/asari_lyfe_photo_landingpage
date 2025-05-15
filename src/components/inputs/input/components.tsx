"use client";

import { FC, useCallback, useEffect, useLayoutEffect, useRef, WheelEventHandler } from "react";
import { InputProps } from "./props";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";

const telRegex : Record<string,RegExp> = {
    numberOnly      : /^\d{0,15}$/,
    withPlus        : /^\+\d{0,15}$/,
    withSeparator   : /^\d{0,5}(\-\d{0,5})?(\-\d{0,5})?$/,
    complete        : /^\+\d{0,3}( \d{0,3})?(\-\d{0,5})?(-\d{0,5})?$/,
}

export const Input : FC<InputProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    required = false,
    onChange,
    onWheel,
    type,
    error,
    ...props
}) => {
    const inputId = id || `input-${name}`

    const inputRef      = useRef<HTMLInputElement>(null)
    const onChangeRef   = useRef(onChange)

    const handleChange = changeHandlerGenerator<HTMLInputElement>(onChange)

    const handleNumberFilter = useCallback((event : HTMLElementEventMap['input']) => {
        const target = event.target as HTMLInputElement
        let modified = false
        let value : number | string = target.value

        if (value.startsWith(' ')) {
            modified = true
            value = value.trimStart()
        }

        if (value.startsWith('0')) {
            modified = true
            value = parseInt(value)
        }

        if (value === '') {
            modified = true
            value = '0'
        }

        if (modified) {
            target.value = `${value}`
        }

        if (typeof onChangeRef.current == 'function') {
            onChangeRef.current({name, value})
        }
    }, [])

    const handleTelFilter = useCallback((event : HTMLElementEventMap['input']) => {
        event.preventDefault()
        event.stopPropagation()

        const target = event.target as HTMLInputElement
        let value : number | string = target.value

        for (const key in telRegex) {
            const regex = telRegex[key];
            if (!regex.test(value)) {
                continue
            }

            target.setAttribute('data-old-value', value)
            target.value = `${value}`
            if (typeof onChangeRef.current == 'function') {
                onChangeRef.current({name, value})
            }
            return
        }

        const oldValue = target.dataset.oldValue as string
        target.value = oldValue
        if (typeof onChangeRef.current == 'function') {
            onChangeRef.current({name, value: oldValue})
        }
    }, [])

    const handleWheel = useCallback<WheelEventHandler<HTMLInputElement>>((event) => {
        if (typeof onWheel == 'function') {
            onWheel(event)
        }
        
        const target = event.target as HTMLInputElement
        if (target != document.activeElement) {
            return
        }

        if (type != 'number') {
            return
        }

        target.blur()

        setTimeout(() => {
            target.focus()
        }, 0)
    }, [type, onWheel])

    useLayoutEffect(() => {
        if (type != 'number' && type != 'tel') {
            return
        }

        onChangeRef.current = onChange
    }, [onChange])

    useEffect(() => {
        if (!inputRef.current) {
            return
        }

        const input = inputRef.current

        if (type != 'number' && type != 'tel') {
            return
        }
        
        if (type == 'number') {
            input.addEventListener('input', handleNumberFilter)
            return () => {
                input.removeEventListener('input', handleNumberFilter)
            }
        }
        
        if (type == 'tel') {
            input.addEventListener('input', handleTelFilter)
            return () => {
                input.removeEventListener('input', handleTelFilter)
            }
        }
    }, [type])

    useEffect(() => {
        if (!error || !inputRef.current) {
            return
        }

        inputRef.current.focus()

        const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(inputRef.current, {
            title: error,
            placement: 'bottom',
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
                ref={inputRef}
                id={inputId}
                name={name}
                className={`form-control ${className}`}
                onChange={handleChange}
                onWheel={handleWheel}
                required={required}
                type={type}
                {...props}
            />
        </div>
    )
}