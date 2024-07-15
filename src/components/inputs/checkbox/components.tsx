import { FC } from "react";
import { CheckboxProps } from "./props";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";

export const Checkbox : FC<CheckboxProps> = ({
    name,
    label               = '',
    id                  = '',
    className           = '',
    wrapperClassName    = '',
    onChange,
    ...props
}) => {
    const inputId = id || `checkbox-${name}`

    const handleChange = changeHandlerGenerator(onChange)

    return (
        <div 
            className={`form-check ${wrapperClassName}`}
        >
            <input 
                className={`form-check-input ${className}`} 
                type="checkbox"
                id={inputId}
                name={name}
                onChange={handleChange}
                {...props}
            />
            <label 
                className="form-check-label"
                htmlFor={inputId}
            >
                { label || name }
            </label>
        </div>
    )
}