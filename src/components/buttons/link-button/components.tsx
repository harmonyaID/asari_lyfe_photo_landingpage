import { FC } from "react";
import { LinkButtonProps } from "./props";
import Link from "next/link";

export const LinkButton : FC<LinkButtonProps> = ({
    pill = false,
    className = '',
    ...props
}) => (
    <Link
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
