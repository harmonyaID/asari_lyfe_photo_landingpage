'use client'

import { FC, FormEventHandler, useState } from "react"
import { CancelFormProps } from "./props"
import { useRouter } from "next/navigation"
import { cancelBooking } from "@/book/services/booking"
import Link from "next/link"
import { Logo } from "@/components/brandings"
import { Loader } from "@/components/misc"
import { Button } from "@/components/buttons"
import { ChevronLeft } from "react-feather"
import { Textarea } from "@/components/inputs"
import { InputChangeHandler } from "@/helpers/changeHandlers"

export const CancelForm : FC<CancelFormProps> = ({ 
    number,
    url,
    code,
    onSuccess
}) => {

    const router = useRouter()

    const [isSending, setIsSending] = useState(false)
    const [reason, setReason] = useState('')

    const handleChange : InputChangeHandler = ({value}) => {
        setReason(value)
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

                    const formRequest = {
                        code            : code,
                        recaptchaToken  : token,
                        recaptchaAction : action,
                        reason          : reason,
                    }

                    cancelBooking(number, formRequest)
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
                <Textarea
                    name="reason"
                    onChange={handleChange}
                    value={reason}
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
                        Cancel Appointment
                    </Button>
                </div>
            </div>
        </form>
    )

}