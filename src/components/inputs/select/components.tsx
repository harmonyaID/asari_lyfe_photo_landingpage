'use client';

import { FC } from "react";
import { SelectProps } from "./props";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";

export const Select : FC<SelectProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    required = false,
    onChange,
    options = [],
    ...props
}) => {
    const inputId = id || `select-${name}`
    const handleChange = changeHandlerGenerator<HTMLSelectElement>(onChange)

    return (
        <div className={wrapperClassName}>
            { label ? (
                <label
                    htmlFor={inputId}
                    className="form-label"
                >
                    { label }
                    { required ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>) }
            <select
                id={inputId}
                name={name}
                className={`form-select ${ className }`}
                onChange={handleChange}
                required={required}
                {...props}
            >
                { options.map((option) => {
                    const isString = typeof option == 'string'

                    const value = isString ? option : option.value
                    const label = isString ? option : option.label

                    return (
                        <option
                            key={value}
                            value={value}
                        >
                            { label }
                        </option>
                    )
                }) }
            </select>
        </div>
    )
}