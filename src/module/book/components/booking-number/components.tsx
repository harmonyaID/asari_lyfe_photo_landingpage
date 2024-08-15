'use client';

import { FC, useState } from "react";
import { BookingNumberProps } from "./props";
import { notifyError } from "@/helpers/notifications";

export const BookingNumber : FC<BookingNumberProps> = ({
    number,
    className = ''
}) => {
    const [recentlyClicked, setRecentlyClicked] = useState(false)

    const handleClick = () => {
        if (recentlyClicked) {
            return
        }

        setRecentlyClicked(true)

        try {
            navigator.clipboard.writeText(number)
            setTimeout(() => {
                setRecentlyClicked(false)
            }, 1500)
        } catch (error) {
            notifyError('Failed to copy number')
            setRecentlyClicked(false)
        }

    }

    return (
        <p 
            className={`${
                "position-relative fw-light fs-3 py-1 px-3 bg-grey-900"
            } ${
                className
            }`}
            onClick={handleClick}
        >
            { number }
            { recentlyClicked ? (
                <div 
                    className="position-absolute top-0 start-0 end-0 bottom-0 bg-grey-800 fs-7 d-flex align-items-center justify-content-center"
                >
                    <span>
                        Booking number copied
                    </span>
                </div>
            ) : (<></>) }
        </p>
    )
}
