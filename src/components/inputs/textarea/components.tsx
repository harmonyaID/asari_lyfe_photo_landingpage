import { FC } from "react";
import { TextareaProps } from "./props";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";

export const Textarea : FC<TextareaProps> = ({
    className = '',
    wrapperClassName = '',
    id,
    name,
    label = '',
    readOnly = false,
    required = false,
    onChange,
    ...props
}) => {
    const inputId = id || `textarea-${name}`

    const handleChange = changeHandlerGenerator<HTMLTextAreaElement>(onChange)

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
                        readOnly ? 'text-primary fw-semibold' : ''
                    }`}
                >
                    { label }
                    { required && !readOnly ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>) }
            <textarea
                id={inputId}
                name={name}
                className={`${ readOnly ? 'form-control-plaintext' : 'form-control' } ${className}`}
                onChange={handleChange}
                readOnly={readOnly}
                required={required}
                {...props}
            />
        </div>
    )
}