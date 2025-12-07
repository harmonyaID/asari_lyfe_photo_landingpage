'use client'

import { FC, FormEventHandler, useState } from "react"
import { RescheduleFormProps } from "./props"
import { useRouter } from "next/navigation"
import { rescheduleBooking } from "@/book/services/booking"
import Link from "next/link"
import { Logo } from "@/components/brandings"
import { Loader } from "@/components/misc"
import { Button } from "@/components/buttons"
import { RescheduleBookingFormdata } from "@/book/types/booking"
import { InputChangeHandler } from "@/helpers/changeHandlers"
import { useFindScheduleSetting } from "@/setting/hooks"
import { DAY_OFFS } from "@/setting/constants"
import { ChevronLeft } from "react-feather"
import { DatePicker } from "@/components/inputs"
import { ScheduleSelect } from "../schedule-select"

export const RescheduleForm : FC<RescheduleFormProps> = ({ 
    number,
    url,
    code,
    booking,
    onBack
}) => {
    const router = useRouter()
    
    const [formData, setFormData] = useState<RescheduleBookingFormdata>({
        code            : code,
        date            : booking?.date || '',
        recaptchaAction : '',
        recaptchaToken  : '',
        scheduleId      : booking?.schedule?.id || 0
    })

    const { data: scheduleSetting, isLoading } = useFindScheduleSetting(DAY_OFFS, booking?.location?.id || 0)
    
    const handleChange : InputChangeHandler = ({name, value}) => {
        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const [isSending, setIsSending] = useState(false)

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

                    const formRequest = {
                        ...formData,
                        recaptchaAction : action
                    }

                    rescheduleBooking(number, formRequest)
                        .then(response => {
                            if (response?.status.code != 200) {
                                return
                            }

                            router.push('reschedule-success')
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
                    "content-header position-lg-sticky top-0 bg-white z-1"
                }`}
            >
                <Link href="/">
                    <Logo
                        size={96}
                        className="mb-4 pb-2"
                    />
                </Link>
                <h1 className="fw-light mb-3 page-title">
                    Reschedule Appointment <span className="fw-semibold">#{ number }</span>
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`${
                    "min-h-screen-60"
                }`}
            >
                <div className="d-grid gap-3">
                    <div className="pb-1">
                        <Button
                            type="button"
                            outline
                            className="d-inline-flex gap-1 align-items-center justify-content-center"
                            onClick={onBack}
                        >
                            <ChevronLeft/>
                            <span>Back</span>
                        </Button>
                    </div>
                    <DatePicker
                        name="date"
                        value={formData.date || ''}
                        onChange={handleChange}
                        label="Choose Session Date"
                        placeholder="e.g. 30 September 2024"
                        required
                        datesDisabled={scheduleSetting?.result?.value || []}
                    />
                    <ScheduleSelect
                        required
                        value={formData.scheduleId}
                        onChange={handleChange}
                        date={formData.date}
                        locationId={booking?.location?.id || 0}
                    />
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
                            Reschedule Appointment
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    )

}