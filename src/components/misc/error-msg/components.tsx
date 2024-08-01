import { FC } from "react";
import { ErrorMsgProps } from "./props";

export const ErrorMsg : FC<ErrorMsgProps> = ({
    className = '',
    message = 'Oops, something went wrong'
}) => (
    <div className="py-5 px-3">
        <h4 className={`fw-normal text-center text-danger ${className}`}>
            { message }
        </h4>
    </div>
)