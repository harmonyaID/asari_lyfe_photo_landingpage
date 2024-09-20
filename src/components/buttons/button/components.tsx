import { FC } from "react";
import { ButtonProps } from "./props";

export const Button : FC<ButtonProps> = ({
    className = '',
    pill = false,
    outline = false,
    ...props
}) => (
    <button
        className={`${
            "btn"
        } ${
            !outline ? 'btn-primary text-white' : 'btn-outline-primary'
        } ${
            pill ? 'rounded-pill' : ''
        } ${
            className
        }`}
        {...props}
    />
)
