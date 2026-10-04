'use client'

import { FC, FormEventHandler, useContext } from "react"
import { FeedbackFormContext, FeedbackFormContextType } from "../contexts/FeedbackFormContext"
import { RatingInput } from "@/components/inputs/rating-input"
import { Button } from "@/components/buttons"
import { PriceRating } from "@/components/inputs"
import { PhotoFormatInput } from "./PhotoFormatInput"
import { ChevronLeft } from "react-feather"

export const ProductPriceForm : FC = () => {
    const {
        formData, handleChange,
        errors, setErrors,
        setPhase
    } = useContext(FeedbackFormContext) as FeedbackFormContextType

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const newErrors = { ...errors }

        if (!formData.photoQualityRating) {
            newErrors.photoQualityRating = 'Please select rating'
        } else if ('photoQualityRating' in newErrors) {
            delete newErrors.photoQualityRating
        }

        if (!formData.priceRatingId) {
            newErrors.priceRatingId = 'Please available option'
        } else if ('priceRatingId' in newErrors) {
            delete newErrors.priceRatingId
        }

        if (!formData.photoFormatIds?.length) {
            newErrors.photoFormatIds = 'Please select at least one'
        } else if ('photoFormatIds' in newErrors) {
            delete newErrors.photoFormatIds
        }

        setErrors(newErrors)

        if (('photoQualityRating' in newErrors) ||
            ('priceRatingId' in newErrors) ||
            ('photoFormatIds' in newErrors)
        ) {
            return
        }

        setPhase('loyality & promotion')
    }

    const handleBack = () => {
        setPhase('experience')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen-60"
        >
            <div className="d-grid gap-3">
                <div className="pb-1">
                    <Button
                        type="button"
                        outline
                        className="d-inline-flex gap-1 align-items-center justify-content-center"
                        onClick={handleBack}
                    >
                        <ChevronLeft/>
                        <span>Back</span>
                    </Button>
                </div>
                <RatingInput
                    label="Photo Quality"
                    name="photoQualityRating"
                    value={formData.photoQualityRating}
                    required
                    onChange={handleChange}
                    error={errors.photoQualityRating}
                />
                <PriceRating
                    label="Price & Package Variations"
                    name="priceRatingId"
                    required
                    value={formData.priceRatingId}
                    onChange={handleChange}
                    error={errors.priceRatingId}
                />
                <PhotoFormatInput
                    label="Favorite Photo Format"
                    name="photoFormatIds"
                    required
                    value={formData.photoFormatIds}
                    onChange={handleChange}
                    error={errors.photoFormatIds}
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