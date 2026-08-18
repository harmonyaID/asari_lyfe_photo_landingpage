'use client'

import { CreateBookingFormdata } from "@/book/types";
import { InputChangeHandler } from "@/helpers/changeHandlers";
import { Location } from "@/location/types";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useState } from "react";

export type ErrorKey = keyof CreateBookingFormdata
type ErrorType = Partial<Record<ErrorKey, string>>
export type StatusType = 'new' | 'returning' | ''
type PhaseType = 'status' | 'location' | 'personal data'

export interface BookingFormContextType {
    formData    : CreateBookingFormdata
    handleChange: InputChangeHandler
    reset       : () => void
    location?   : Location
    errors      : ErrorType
    setErrors   : Dispatch<SetStateAction<ErrorType>>
    status      : StatusType
    setStatus   : Dispatch<SetStateAction<StatusType>>
    phase       : PhaseType
    setPhase    : Dispatch<SetStateAction<PhaseType>>
}

interface Props extends PropsWithChildren {
    location?: Location
}

export const BookingFormContext = createContext<BookingFormContextType|null>(null)
export const BookingFormProvider : FC<Props> = ({ 
    location, 
    children 
}) => {
    const [formData, setFormData] = useState<CreateBookingFormdata>({
        source              : 'Website',
        recaptchaToken      : '',
        recaptchaAction     : '',
        date                : '',
        checkoutDate        : '',
        locationId          : location ? location.id : 0,
        scheduleId          : 0,
        preferredLanguage   : undefined,
        preferredLanguageId : 0,
        customerNumber      : '',
        name                : '',
        email               : '',
        phone               : '',
        roomNumber          : '',
        paxQty              : 0,
        compilance          : false,
    })

    const [errors, setErrors] = useState<ErrorType>({})
    const [status, setStatus] = useState<StatusType>('')
    const [phase, setPhase] = useState<PhaseType>('status')

    
    const handleChange : InputChangeHandler = ({name, value}) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

        if ((name in errors) && value) {
            setErrors((prevState) => {
                const newState = { ...prevState }
                delete newState[name as ErrorKey]

                return newState
            })
        }
    }

    const reset = useCallback(() => {
        setFormData((prevState) => ({
            ...prevState,
            source              : 'Website',
            recaptchaToken      : '',
            recaptchaAction     : '',
            date                : '',
            checkoutDate        : '',
            locationId          : location ? location.id : 0,
            scheduleId          : 0,
            preferredLanguage   : undefined,
            preferredLanguageId : 0,
            customerNumber      : '',
            name                : '',
            email               : '',
            phone               : '',
            roomNumber          : '',
            paxQty              : 0,
            compilance          : false,
        }))

        setErrors((prevState) => ({}))
    }, [setFormData, setErrors, location])

    return (
        <BookingFormContext.Provider
            value={{
                formData, handleChange,
                errors, setErrors, reset,
                status, setStatus,
                phase, setPhase,
                location,
            }}
        >
            { children }
        </BookingFormContext.Provider>
    )
}