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

export const CancelForm : FC<CancelFormProps> = ({ 
    number,
    url,
    code,
    onBack,
}) => {

    const router = useRouter()

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
                        code            : code,
                        recaptchaToken  : token,
                        recaptchaAction : action
                    }

                    cancelBooking(number, formRequest)
                        .then(response => {
                            if (response?.status.code != 200) {
                                return
                            }

                            router.push('cancel-success')
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
                    Cancel Appointment <span className="fw-semibold">#{ number }</span>
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
                    <p className="text-center">
                        Are you sure you want to cancel this appointment?
                    </p>
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
        </section>
    )

}