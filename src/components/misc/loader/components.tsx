import { FC } from "react";
import { LoaderProps } from "./props";

export const Loader : FC<LoaderProps> = ({
    small = false,
    hidden = false,
    className = ''
}) => {
    if (hidden) {
        return (<></>)
    }

    return (
        <div 
            className={`spinner-border ${small ? 'spinner-border-sm' : ''} ${className}`} 
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}