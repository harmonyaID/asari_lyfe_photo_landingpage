import { FC } from "react";
import { ThumbnailProps } from "./props";

export const Thumbnail : FC<ThumbnailProps> = ({
    className = '',
    src,
    alt,
}) => (
    <div 
        className={`${
            "thumbnail position-relative overflow-hidden"
        } ${
            className
        }`}
    >
        <img 
            src={src}
            alt={alt}
        />
    </div>
)