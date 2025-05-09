"use client";

import { FC, useCallback, useEffect, useLayoutEffect, useRef } from "react";
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
    type,
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
                required={required}
                type={type}
                {...props}
            />
        </div>
    )
}