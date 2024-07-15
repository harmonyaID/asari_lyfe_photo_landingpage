"use client";

import { FC } from "react";
import { InputProps } from "./props";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";

export const Input : FC<InputProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    required = false,
    onChange,
    ...props
}) => {
    const inputId = id || `input-${name}`

    const handleChange = changeHandlerGenerator<HTMLInputElement>(onChange)

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
                id={inputId}
                name={name}
                className={`form-control ${className}`}
                onChange={handleChange}
                required={required}
                {...props}
            />
        </div>
    )
}