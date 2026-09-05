'use client'

import { CreateBookingFormdata } from "@/event-booking/types/booking";
import { Package } from "@/event-booking/types/package";
import { InputChangeHandler } from "@/helpers/changeHandlers";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useState } from "react";

export type ErrorKey = keyof CreateBookingFormdata
type ErrorType = Partial<Record<ErrorKey, string>>

type PhaseType = 'location' | 'personal data'

export interface BookingFormContextType {
    formData        : CreateBookingFormdata
    handleChange    : InputChangeHandler
    reset           : () => void
    eventPackage?   : Package
    errors          : ErrorType
    setErrors       : Dispatch<SetStateAction<ErrorType>>
    phase           : PhaseType
    setPhase        : Dispatch<SetStateAction<PhaseType>>
}

interface Props extends PropsWithChildren {
    eventPackage: Package
}

export const BookingFormContext = createContext<BookingFormContextType|null>(null)
export const BookingFormProvider : FC<Props> = ({ 
    eventPackage, 
    children 
}) => {
    const [formData, setFormData] = useState<CreateBookingFormdata>({
        source          : 'Website',
        recaptchaToken  : '',
        recaptchaAction : '',
        date            : '',
        name            : '',
        email           : '',
        phone           : '',
        location        : '',
        notes           : '',
        time            : '',
        packageId       : eventPackage.id,
        eventTypeId     : eventPackage.eventType.id,
        timezone        : window.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        compilance      : false,
    })

    const [errors, setErrors] = useState<ErrorType>({})
    const [phase, setPhase] = useState<PhaseType>('location')

    
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
            source          : 'Website',
            recaptchaToken  : '',
            recaptchaAction : '',
            date            : '',
            name            : '',
            email           : '',
            phone           : '',
            location        : '',
            time            : '',
            notes           : '',
            packageId       : eventPackage.id,
            eventTypeId     : eventPackage.eventType.id,
            timezone        : window.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            compilance      : false,
        }))

        setErrors((prevState) => ({}))
    }, [setFormData, setErrors, eventPackage])

    return (
        <BookingFormContext.Provider
            value={{
                formData, handleChange,
                errors, setErrors, reset,
                phase, setPhase,
                eventPackage,
            }}
        >
            { children }
        </BookingFormContext.Provider>
    )
}