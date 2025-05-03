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
import { UserCheck, UserPlus } from "react-feather";

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

    const handleChange : InputChangeHandler = ({name, value}) => {
        setFormData(prevState => ({
            ...prevState,
            [name] : value
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
            <Link href="/">
                <Logo
                    size={96}
                    className="mb-4 pb-2"
                />
            </Link>
            <h1 className="fw-light mb-3 page-title">
                Record Your Memory <span className="fw-semibold">With Us</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className={`${
                    "row overflow-y-auto max-h-lg-screen-60 min-h-screen-60"
                } ${
                    !status ? 'pt-5' : ''
                }`}
            >
                { !status ? (
                    <>
                        <div className="col-6 mb-3">
                            <div 
                                className="card selectable"
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
                        </div>
                        <div className="col-6 mb-3">
                            <div 
                                className="card selectable"
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
                        </div>
                    </>
                ) : (
                    <>
                        { status == 'new' ? (
                            <>
                                <div className="col-12 mb-3">
                                    <Input
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        label="Name"
                                        required
                                        placeholder="e.g Nama Saya Budi"
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <Input
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        label="Email"
                                        type="email"
                                        placeholder="e.g budi@nama.saya"
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <Input
                                        name="phone"
                                        value={formData.phone || ''}
                                        onChange={handleChange}
                                        label="Phone"
                                        type="tel"
                                        required
                                        placeholder="e.g 6281122223333"
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <LanguageSelect
                                        name="preferredLanguageId"
                                        label="Preferred Language"
                                        value={formData.preferredLanguageId || 0}
                                        onChange={handleChange}
                                    />
                                </div>
                            </> 
                        ) : (
                            <div className="col-12 mb-3">
                                <Input
                                    name="customerNumber"
                                    value={formData.customerNumber || ''}
                                    onChange={handleChange}
                                    label="Customer Number"
                                    required
                                    placeholder="e.g 123456999"
                                />
                            </div>
                        )}
                        <div className="col-12 mb-3">
                            { !location ? (
                                <LocationSelect
                                    required
                                    value={formData.locationId || ''}
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
                        <div className="col-6 mb-3">
                            <Input
                                name="roomNumber"
                                value={formData.roomNumber || ''}
                                onChange={handleChange}
                                label="Room"
                                placeholder="e.g HI-203"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                name="paxQty"
                                value={formData.paxQty || ''}
                                onChange={handleChange}
                                label="PAX"
                                placeholder="e.g 1"
                                type="number"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <DatePicker
                                name="date"
                                value={formData.date || ''}
                                onChange={handleChange}
                                label="Choose Session Date"
                                placeholder="e.g. 30 September 2024"
                                required
                                datesDisabled={scheduleSetting?.result?.value || []}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <DatePicker
                                name="checkoutDate"
                                value={formData.checkoutDate || ''}
                                onChange={handleChange}
                                label="Checkout Date"
                                placeholder="e.g. 2 October 2024"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <ScheduleSelect
                                required
                                value={formData.scheduleId}
                                onChange={handleChange}
                                date={formData.date}
                                locationId={formData.locationId}
                            />
                        </div>
                        <div className="col-12 mb-3">
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
                        <div className="col-12 mb-3 text-danger fst-italic">
                            *required field
                        </div>
                        <div className="col-12 mb-3">
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
            </form>
        </section>
    )
}
