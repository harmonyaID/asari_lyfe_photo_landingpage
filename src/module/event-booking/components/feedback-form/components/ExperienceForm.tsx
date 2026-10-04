'use client'

import { FC, FormEventHandler, useContext } from "react"
import { FeedbackFormContext, FeedbackFormContextType } from "../contexts/FeedbackFormContext"
import { RatingInput } from "@/components/inputs/rating-input"
import { Button } from "@/components/buttons"

export const ExperienceForm : FC = () => {
    const {
        formData, handleChange,
        errors, setErrors,
        setPhase
    } = useContext(FeedbackFormContext) as FeedbackFormContextType

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const newErrors = { ...errors }

        if (!formData.experienceRating) {
            newErrors.experienceRating = 'Please select rating'
        } else if ('experienceRating' in newErrors) {
            delete newErrors.experienceRating
        }

        if (!formData.photographerRating) {
            newErrors.photographerRating = 'Please select rating'
        } else if ('photographerRating' in newErrors) {
            delete newErrors.photographerRating
        }

        if (!formData.adminRating) {
            newErrors.adminRating = 'Please select rating'
        } else if ('adminRating' in newErrors) {
            delete newErrors.adminRating
        }

        setErrors(newErrors)

        if (('experienceRating' in newErrors) ||
            ('photographerRating' in newErrors) ||
            ('adminRating' in newErrors)
        ) {
            return
        }

        setPhase('product & price')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen-60"
        >
            <div className="d-grid gap-3">
                <RatingInput
                    label="Photo Session Experience"
                    name="experienceRating"
                    value={formData.experienceRating}
                    onChange={handleChange}
                    required
                    error={errors.experienceRating}
                />
                <RatingInput
                    label="Photographer's service and direction"
                    name="photographerRating"
                    value={formData.photographerRating}
                    onChange={handleChange}
                    required
                    error={errors.photographerRating}
                />
                <RatingInput
                    label="Counter staff's service"
                    name="adminRating"
                    value={formData.adminRating}
                    onChange={handleChange}
                    required
                    error={errors.adminRating}
                />
                <div className="text-danger fst-italic">
                    *required field
                </div>

                <Button
                    type="submit"
                    pill
                >
                    Next
                </Button>
            </div>
        </form>
    )
}