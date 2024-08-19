'use client';

import { FC, useEffect, useState } from "react";
import { BookingNumberProps } from "./props";
import { notifyError } from "@/helpers/notifications";
import { BOOKING_NUMBER } from "@/configs/session-storage-keys";

export const BookingNumber : FC<BookingNumberProps> = ({
    className = ''
}) => {
    const [recentlyClicked, setRecentlyClicked] = useState(false)
    const [number, setNumber] = useState('')

    const handleClick = () => {
        if (recentlyClicked || !number) {
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

    useEffect(() => {
        const num = sessionStorage.getItem(BOOKING_NUMBER)
        if (!num) {
            return
        }

        setNumber(num)
    }, [])

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
