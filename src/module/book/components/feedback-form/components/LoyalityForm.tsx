'use client'

import { FC, FormEventHandler, useContext, useMemo, useState } from "react"
import { ErrorKey, FeedbackFormContext, FeedbackFormContextType } from "../contexts/FeedbackFormContext"
import { Button } from "@/components/buttons"
import { Checkbox, Radio, Textarea } from "@/components/inputs"
import { ChevronLeft } from "react-feather"
import { getAppName } from "@/helpers/app/functions"
import { createBookingFeedback } from "@/book/services/booking"
import { BookingFeedbackFormdataWithToken } from "@/book/types/booking"
import { usePathname, useRouter } from "next/navigation"
import { Loader } from "@/components/misc"

interface Props {
    number: string
}

export const LoyalityForm : FC<Props> = ({ number }) => {
    const {
        formData, handleChange,
        errors, setErrors,
        phase, setPhase
    } = useContext(FeedbackFormContext) as FeedbackFormContextType
    const appName = getAppName()

    const referralPoint = useMemo(() => Array.from(Array(10).keys()), [])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (loading) {
            return
        }

        const newErrors = { ...errors }

        if (!formData.recommendationScore) {
            newErrors.recommendationScore = 'Please select rating'
        } else if ('recommendationScore' in newErrors) {
            delete newErrors.recommendationScore
        }

        setErrors(newErrors)

        if ('recommendationScore' in newErrors) {
            return
        }

        setLoading(true)

        const action = 'submit'

        grecaptcha.ready(() => {
            grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string, { action: action })
                .then((token) => {
                    const formRequest : BookingFeedbackFormdataWithToken = {
                        ...formData,
                        recaptchaToken  : token,
                        recaptchaAction : action
                    }

                    createBookingFeedback(number, formRequest)
                        .then(response => {
                            if (response?.status?.code != 200) {
                                let newPhase = phase
                                if (response?.status.attributes?.length) {
                                    const newErrors = { ...errors }
                                    response.status.attributes.forEach((attr) => {
                                        if (typeof attr == 'string') {
                                            newErrors[attr as ErrorKey] = response.status.message
                                        } else if (typeof attr == 'object') {
                                            newErrors[attr.param as ErrorKey] = attr.msg
                                        }
                                    })
                                    
                                    setErrors(newErrors)

                                    if (('experienceRating' in newErrors) ||
                                        ('photographerRating' in newErrors) ||
                                        ('adminRating' in newErrors)
                                    ) {
                                        newPhase = 'experience'
                                    } else if (('photoQualityRating' in newErrors) ||
                                        ('priceRatingId' in newErrors) ||
                                        ('photoFormatIds' in newErrors)
                                    ) {
                                        newPhase = 'product & price'
                                    }
                                }

                                if (newPhase != phase) {
                                    setPhase(newPhase)
                                }

                                return
                            }

                            router.push(`${pathname}/success`)
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                })
        })
    }
    
    const handleBack = () => {
        setPhase('product & price')
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
                <div>
                    <label
                        className="form-label"
                    >
                        Would you recommend { appName } to your family and friends?
                        <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex justify-content-between gap-1">
                        { referralPoint.map((point, index) => (
                            <Radio
                                key={`referral-${point}`}
                                name="recommendationScore"
                                wrapperClassName="form-check-inline"
                                value={point + 1}
                                checked={point + 1 == formData.recommendationScore}
                                onChange={handleChange}
                                label={point + 1}
                                error={!index ? errors.recommendationScore : undefined}
                            />
                        )) }
                    </div>
                </div>
                <Textarea
                    name="suggestion"
                    value={formData.suggestion}
                    label="Suggestion"
                    onChange={handleChange}
                />
                <Checkbox
                    name="uploadAllowed"
                    checked={formData.uploadAllowed}
                    onChange={handleChange}
                    label={`I allow the best photo of this session to be uploaded to the social medias of ${appName}`}
                    error={errors.uploadAllowed}
                />
                <div className="text-danger fst-italic">
                    *required field
                </div>

                <Button
                    disabled={loading}
                    type="submit"
                    pill
                >
                    <Loader
                        small
                        hidden={!loading}
                        className="me-2"
                    />
                    Submit
                </Button>
            </div>
        </form>
    )
}