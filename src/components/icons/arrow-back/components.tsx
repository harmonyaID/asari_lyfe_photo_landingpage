import { FC } from "react";
import { IconProps } from "../props";

export const ArrowBackIcon : FC<IconProps> = ({
    width = 40,
    height = 40,
    ...props
}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        {...props}
    >
        <path 
            d="M33.3337 18.3334H13.0503L22.367 9.01669L20.0003 6.66669L6.66699 20L20.0003 33.3334L22.3503 30.9834L13.0503 21.6667H33.3337V18.3334Z"
            fill="#0099AB"
            fillOpacity="0.54"
        />
    </svg>
)
