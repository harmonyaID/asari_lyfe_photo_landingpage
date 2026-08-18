'use client'

import { FC, FormEventHandler, useContext, useState } from "react"
import { BookingFormContext, BookingFormContextType, ErrorKey } from "../contexts/BookingFormContext"
import { Checkbox, Input } from "@/components/inputs"
import { LanguageSelect } from "@/module/misc/components/language-select"
import { Button } from "@/components/buttons"
import { ChevronLeft } from "react-feather"
import Link from "next/link"
import { Loader } from "@/components/misc"
import { CreateBookingFormdata } from "@/book/types"
import { createBooking } from "@/book/services"
import { BOOKING_NUMBER, BRANCH_PHONE, CONFIRMATION_MESSAGE, SUCCESS_MESSAGE } from "@/configs/session-storage-keys"
import { useRouter } from "next/navigation"

export const PersonalDataForm : FC = () => {
    const { 
        formData, handleChange, 
        errors, setErrors, 
        status,
        phase, setPhase,
    } = useContext(BookingFormContext) as BookingFormContextType
    
    const [isSending, setIsSending] = useState(false)
    const router = useRouter()


    const handleBack = () => {
        setPhase('location')
    }

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        if (isSending) {
            return
        }

        setIsSending(() => true)

        if (!validateData()) {
            setIsSending(() => false)
            return
        }

        sendRequest()
    }

    const validateData = () : boolean => {
        const newErrors = { ...errors }

        if (status == 'returning') {
            if (!formData.customerNumber) {
                newErrors.customerNumber = 'Please fill your customer number'
            } else if ('customerNumber' in newErrors) {
                delete newErrors.customerNumber
            }

            setErrors(newErrors)

            return Object.keys(newErrors).length == 0
        }

        if (!formData.name) {
            newErrors.name = 'Please fill your name'
        } else if ('name' in newErrors) {
            delete newErrors.name
        }

        if (!formData.phone) {
            newErrors.phone = 'Please fill your phone'
        } else if ('phone' in newErrors) {
            delete newErrors.phone
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length == 0
    }

    const sendRequest = () => {
        const action = 'submit'

        grecaptcha.ready(() => {
            grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string, { action: action })
                .then((token) => {
                    const formRequest : CreateBookingFormdata = {
                        ...formData,
                        recaptchaToken  : token,
                        recaptchaAction : action
                    }

                    createBooking(formRequest)
                        .then(response => {
                            if (!response?.result) {
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

                                    if (('locationId' in newErrors) ||
                                        ('scheduleId' in newErrors) ||
                                        ('date' in newErrors)
                                    ) {
                                        newPhase = 'location'
                                    }
                                }

                                if (newPhase != phase) {
                                    setPhase(newPhase)
                                }

                                return
                            }

                            const number = response.result.number
                            sessionStorage.setItem(BOOKING_NUMBER, number)

                            const confirmationMsg = response.result.confirmationMsg
                            if (confirmationMsg) {
                                sessionStorage.setItem(CONFIRMATION_MESSAGE, JSON.stringify(confirmationMsg))
                            }

                            const branchPhone = response.result.branchPhone
                            if (branchPhone) {
                                sessionStorage.setItem(BRANCH_PHONE, branchPhone || '')
                            }

                            const successMsg = response.status.attributes
                            if (successMsg) {
                                sessionStorage.setItem(SUCCESS_MESSAGE, JSON.stringify(successMsg))
                            }

                            router.push(`/success`)
                        })
                        .finally(() => {
                            setIsSending(false)
                        })
                })
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen-60"
        >
            <div className="d-grid grid-cols-2 gap-3">
                <div className="grid-span-2 pb-1">
                    <Button
                        type="button"
                        outline
                        className="d-inline-flex gap-1 align-items-center justify-content-center"
                        onClick={handleBack}
                        disabled={isSending}
                    >
                        <ChevronLeft/>
                        <span>Back</span>
                    </Button>
                </div>
                { status == 'new' ? (
                    <>
                        <div className="grid-span-2">
                            <Input
                                name="name"
                                error={ errors.name || '' }
                                value={formData.name || ''}
                                onChange={handleChange}
                                label="Name"
                                required
                                placeholder="e.g Nama Saya Budi"
                            />
                        </div>
                        <div className="grid-span-2">
                            <Input
                                name="email"
                                error={ errors.email || '' }
                                value={formData.email || ''}
                                onChange={handleChange}
                                label="Email"
                                type="email"
                                placeholder="e.g budi@nama.saya"
                            />
                        </div>
                        <div className="grid-span-2">
                            <Input
                                name="phone"
                                error={ errors.phone || '' }
                                value={formData.phone || ''}
                                onChange={handleChange}
                                label="Phone"
                                type="tel"
                                required
                                placeholder="e.g 6281122223333"
                            />
                        </div>
                        <div className="grid-span-2">
                            <LanguageSelect
                                name="preferredLanguageId"
                                error={ errors.preferredLanguageId || '' }
                                label="Preferred Language"
                                value={formData.preferredLanguageId || 0}
                                onChange={handleChange}
                            />
                        </div>
                    </> 
                ) : (
                    <div className="grid-span-2">
                        <Input
                            name="customerNumber"
                            error={ errors.customerNumber || '' }
                            value={formData.customerNumber || ''}
                            onChange={handleChange}
                            label="Customer Number"
                            type="number"
                            required
                            placeholder="e.g 123456999"
                        />
                    </div>
                )}
                <div className="grid-span-2">
                    <Checkbox
                        label={(
                            <>
                                I agree to the
                                {' '}
                                <Link href="/policy">
                                    Terms and Conditions
                                </Link>
                            </>
                        )}
                        name="compilance"
                        checked={formData.compilance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid-span-2 text-danger fst-italic">
                    *required field
                </div>
                <div className="grid-span-2">
                    <div className="d-grid">
                        <Button
                            type="submit"
                            disabled={isSending}
                            pill
                        >
                            <Loader
                                small 
                                hidden={!isSending} 
                                className="me-2"
                            />
                            Book an Appointment
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}