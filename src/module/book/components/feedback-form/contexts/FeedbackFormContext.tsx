'use client'

import { BookingFeedbackFormdata } from "@/book/types/booking"
import { InputChangeHandler } from "@/helpers/changeHandlers"
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from "react"

export type ErrorKey = keyof BookingFeedbackFormdata
type ErrorType = Partial<Record<ErrorKey, string>>
type PhaseType = 'experience' | 'product & price' | 'loyality & promotion'

export interface FeedbackFormContextType {
    formData    : BookingFeedbackFormdata
    handleChange: InputChangeHandler
    reset       : () => void
    errors      : ErrorType
    setErrors   : Dispatch<SetStateAction<ErrorType>>
    phase       : PhaseType
    setPhase    : Dispatch<SetStateAction<PhaseType>>
}

interface Props extends PropsWithChildren {
    code: string
}

export const FeedbackFormContext = createContext<FeedbackFormContextType|null>(null)
export const FeedbackFormProvider : FC<Props> = ({
    code,
    children
}) => {
    const [formData, setFormData] = useState<BookingFeedbackFormdata>({
        code: code,
        experienceRating: 0,
        photographerRating: 0,
        adminRating: 0,
        photoQualityRating: 0,
        priceRatingId: 0,
        photoFormatIds: [],
        recommendationScore: 0,
        suggestion: '',
        uploadAllowed: false,
    })

    const [errors, setErrors] = useState<ErrorType>({})
    const [phase, setPhase] = useState<PhaseType>('experience')


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
            code: code,
            experienceRating: 0,
            photographerRating: 0,
            adminRating: 0,
            photoQualityRating: 0,
            priceRatingId: 0,
            photoFormatIds: [],
            recommendationScore: 0,
            suggestion: '',
            uploadAllowed: false,
        }))

        setErrors((prevState) => ({}))
    }, [setFormData, setErrors, code])


    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            code: code
        }))
    }, [code])

    return (
        <FeedbackFormContext.Provider
            value={{
                formData, handleChange,
                errors, setErrors,
                reset,
                phase, setPhase
            }}
        >
            { children }
        </FeedbackFormContext.Provider>
    )
}