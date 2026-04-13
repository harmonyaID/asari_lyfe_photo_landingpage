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
import { DatePicker, Textarea } from "@/components/inputs"
import { ScheduleSelect } from "../schedule-select"

export const RescheduleForm : FC<RescheduleFormProps> = ({ 
    number,
    url,
    code,
    booking,
    onSuccess
}) => {
    const router = useRouter()
    
    const [formData, setFormData] = useState<RescheduleBookingFormdata>({
        code            : code,
        date            : booking?.date || '',
        recaptchaAction : '',
        recaptchaToken  : '',
        scheduleId      : booking?.schedule?.id || 0,
        reason          : ''
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
                        recaptchaToken  : token,
                        recaptchaAction : action
                    }

                    rescheduleBooking(number, formRequest)
                        .then(response => {
                            if (response?.status.code != 200) {
                                return
                            }
                            
                            if (typeof onSuccess == 'function') {
                                onSuccess()
                            }

                            router.refresh()
                        })
                        .finally(() => {
                            setIsSending(false)
                        })

                })
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-grid gap-3">
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
                <Textarea
                    name="reason"
                    onChange={handleChange}
                    value={formData.reason}
                    label="Reason"
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
    )

}