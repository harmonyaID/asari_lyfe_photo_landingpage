import { FC } from "react";
import { LogoProps } from "./props";

export const Logo : FC<LogoProps> = ({
    size = 96,
    className = ''
}) => {
    return (
        <img 
            src="/images/logo.webp"
            width={size}
            height="auto"
            alt="Lyfe Foto Logo"
            className={className}
        />
    )
}