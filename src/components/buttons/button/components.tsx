import { FC } from "react";
import { ButtonProps } from "./props";

export const Button : FC<ButtonProps> = ({
    className = '',
    pill = false,
    ...props
}) => (
    <button
        className={`${
            "btn btn-primary text-white"
        } ${
            pill ? 'rounded-pill' : ''
        } ${
            className
        }`}
        {...props}
    />
)
