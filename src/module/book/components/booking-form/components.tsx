"use client";

import { Logo } from "@/components/brandings";
import { Button } from "@/components/buttons";
import { Checkbox, DatePicker, Input } from "@/components/inputs";
import { InputChangeHandler } from "@/helpers/changeHandlers/types";
import { LocationSelect } from "@/location/components/location-select";
import { DAY_OFFS } from "@/setting/constants";
import { useFindScheduleSetting } from "@/setting/hooks";
import Link from "next/link";
import { FC, FormEventHandler, useState } from "react";
import { ScheduleSelect } from "../schedule-select";
import { CreateBookingFormdata } from "@/book/types";
import { createBooking } from "@/book/services";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/misc";
import { BOOKING_NUMBER, SUCCESS_MESSAGE } from "@/configs/session-storage-keys";
import { LanguageSelect } from "@/module/misc/components/language-select";
import { BookingFormProps } from "./props";
import { ChevronLeft, UserCheck, UserPlus } from "react-feather";

export const BookingForm : FC<BookingFormProps> = ({ location }) => {

    const router = useRouter()

    const [isSending, setIsSending] = useState(false)
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
    const { data: scheduleSetting, isLoading } = useFindScheduleSetting(DAY_OFFS, formData.locationId || 0)

    const [status, setStatus] = useState<'new' | 'returning' | ''>('')
    const [error, setError] = useState({
        attribute   : '',
        message     : '',
    })

    const handleChange : InputChangeHandler = ({name, value}) => {
        if (error.attribute == name) {
            setError((prevState) => ({
                ...prevState,
                attribute   : '',
                message     : '',
            }))
        }

        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleError = (message: string, attribute: string | Record<string, any>) => {
        setError((prevState) => {
            const modified = { ...prevState }

            if (typeof attribute == 'object') {
                modified.attribute  = attribute.param
                modified.message    = attribute.msg
            } else {
                modified.attribute  = attribute
                modified.message    = message
            } 

            return modified
        })
    }

    const handleBack = () => {
        setStatus('')
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
    }

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        if (isSending) {
            return
        }

        setIsSending(true)

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
                                if (response?.status.attributes?.length) {
                                    handleError(response.status.message, response.status.attributes[0])
                                }

                                return
                            }

                            const number = response.result.number
                            sessionStorage.setItem(BOOKING_NUMBER, number)

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
        <section className="text-start">
            <div 
                className={`${
                    "content-header position-lg-sticky top-0 bg-white"
                } ${
                    !status ? 'pb-5' : ''
                }`}
            >
                <Link href="/">
                    <Logo
                        size={96}
                        className="mb-4 pb-2"
                    />
                </Link>
                <h1 className="fw-light mb-3 page-title">
                    Record Your Memory <span className="fw-semibold">With Us</span>
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`${
                    "min-h-screen-60"
                }`}
            >
                <div className="d-grid grid-cols-2 gap-3">
                    { !status ? (
                        <>
                            <div 
                                className="card selectable grid-span-2 grid-span-md-1"
                                onClick={() => setStatus('new')}
                            >
                                <div className="card-body text-center">
                                    <UserPlus
                                        size="3rem"
                                        strokeWidth={1}
                                        className="text-primary"
                                    />
                                    <div className="fw-semibold">
                                        New Customer
                                    </div>
                                </div>
                            </div>
                            <div 
                                className="card selectable grid-span-2 grid-span-md-1"
                                onClick={() => setStatus('returning')}
                            >
                                <div className="card-body text-center">
                                    <UserCheck
                                        size="3rem"
                                        strokeWidth={1}
                                        className="text-primary"
                                    />
                                    <div className="fw-semibold">
                                        Returning Customer
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid-span-2 pb-1">
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
                            { status == 'new' ? (
                                <>
                                    <div className="grid-span-2">
                                        <Input
                                            name="name"
                                            error={ error.attribute == 'name' ? error.message : '' }
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
                                            error={ error.attribute == 'email' ? error.message : '' }
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
                                            error={ error.attribute == 'phone' ? error.message : '' }
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
                                            error={ error.attribute == 'preferredLanguageId' ? error.message : '' }
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
                                        error={ error.attribute == 'customerNumber' ? error.message : '' }
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
                                { !location ? (
                                    <LocationSelect
                                        required
                                        value={formData.locationId || 0}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        name="location"
                                        label="Location"
                                        readOnly
                                        value={location.name || ''}
                                        className="border-white"
                                    />
                                ) }
                            </div>
                            <div>
                                <Input
                                    name="roomNumber"
                                    error={ error.attribute == 'roomNumber' ? error.message : '' }
                                    value={formData.roomNumber || ''}
                                    onChange={handleChange}
                                    label="Room"
                                    placeholder="e.g HI-203"
                                />
                            </div>
                            <div>
                                <Input
                                    name="paxQty"
                                    error={ error.attribute == 'paxQty' ? error.message : '' }
                                    value={formData.paxQty || ''}
                                    onChange={handleChange}
                                    label="PAX"
                                    placeholder="e.g 1"
                                    type="number"
                                />
                            </div>
                            <div className="grid-span-2 grid-span-md-1">
                                <DatePicker
                                    name="date"
                                    error={ error.attribute == 'date' ? error.message : '' }
                                    value={formData.date || ''}
                                    onChange={handleChange}
                                    label="Choose Session Date"
                                    placeholder="e.g. 30 September 2024"
                                    required
                                    datesDisabled={scheduleSetting?.result?.value || []}
                                />
                            </div>
                            <div className="grid-span-2 grid-span-md-1">
                                <DatePicker
                                    name="checkoutDate"
                                    error={ error.attribute == 'checkoutDate' ? error.message : '' }
                                    value={formData.checkoutDate || ''}
                                    onChange={handleChange}
                                    label="Checkout Date"
                                    placeholder="e.g. 2 October 2024"
                                />
                            </div>
                            <div className="grid-span-2">
                                <ScheduleSelect
                                    error={ error.attribute == 'scheduleId' ? error.message : '' }
                                    required
                                    value={formData.scheduleId}
                                    onChange={handleChange}
                                    date={formData.date}
                                    locationId={formData.locationId}
                                />
                            </div>
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
                        </>
                    ) }
                </div>
            </form>
        </section>
    )
}
