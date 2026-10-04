'use client'

import { ChangeEventHandler, ComponentPropsWithoutRef, FC, ReactNode, useCallback, useEffect, useRef } from "react"
import { changeHandlerGenerator, InputChangeHandler } from "@/helpers/changeHandlers"
import { PHOTO_FORMATS } from "../constants/photo-formats"

interface Props extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'onChange' | 'type' | 'value'> {
    label?              : ReactNode
    name                : string
    wrapperClassName?   : string
    onChange?           : InputChangeHandler
    error?              : string
    value?              : number[]
}

export const PhotoFormatInput : FC<Props> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    value = [],
    required = false,
    onChange,
    error,
    readOnly = false,
    ...props
}) => {
    const inputId = id || `photo-format-${name}`

    const firstInputRef = useRef<HTMLInputElement>(null)

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
        if (typeof onChange != 'function') {
            return
        }

        const target = event.target
        const checked = target.checked
        const targetValue = parseInt(target.value)

        let modified = [ ...value ]
        if (checked && !modified.includes(targetValue)) {
            modified.push(targetValue)
        } else if (!checked && modified.includes(targetValue)) {
            modified = modified.filter((item) => item != targetValue)
        }

        console.log(modified, targetValue, checked)

        onChange({ name: name, value: modified })

    }, [onChange, value, name])

    
    useEffect(() => {
        if (!error || !firstInputRef.current) {
            return
        }

        firstInputRef.current.focus()

        const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(firstInputRef.current, {
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
                    className={`${
                        "form-label"
                    } ${
                        readOnly ? 'text-primary fw-medium' : ''
                    }`}
                >
                    { label }
                    { required ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>) }
            <div className="d-flex gap-1 justify-content-between">
                { PHOTO_FORMATS.map((option, index) => (
                    <div 
                        className={`${
                            "form-check form-check-inline"
                        } ${
                            className
                        }`}
                        key={`option=${index}`}
                    >
                        <input 
                            ref={index == 0 ? firstInputRef : null}
                            className="form-check-input"
                            type="checkbox"
                            name={name}
                            id={`${inputId}-${option.id}`} 
                            checked={value.includes(option.id)}
                            value={option.id}
                            onChange={handleChange}
                        />
                        <label 
                            className="form-check-label" 
                            htmlFor={`${inputId}-${option.id}`}
                        >
                            { option.label }
                        </label>
                    </div>
                )) }
            </div>
        </div>
    )
}