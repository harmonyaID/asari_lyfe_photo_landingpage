import { FC } from "react";
import { RadioProps } from "./props";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";

export const Radio : FC<RadioProps> = ({
    name,
    label               = '',
    id                  = '',
    className           = '',
    wrapperClassName    = '',
    onChange,
    ...props
}) => {
    const inputId = id || `radio-${name}`

    const handleChange = changeHandlerGenerator(onChange)

    return (
        <div 
            className={`form-check ${wrapperClassName}`}
        >
            <input 
                className={`form-check-input ${className}`} 
                type="radio"
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