'use client'

import { FC, FormEventHandler, useState } from "react"
import { SelfAdjustmentDetailProps } from "./props"
import { useRouter } from "next/navigation"
import { deleteBookingAdjustment } from "@/book/services/booking"
import { Loader } from "@/components/misc"
import { Button } from "@/components/buttons"
import { Input } from "@/components/inputs"
import { Modal } from "@/components/modals"
import { APPROVED_ID } from "@/book/constants/BookingAdjustmentRequestStatus"

export const SelfAdjustmentDetail : FC<SelfAdjustmentDetailProps> = ({
    booking,
    number,
    code
}) => {

    const router = useRouter()

    const [isSending, setIsSending] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        setModalOpen(true)
    }

    const handleHide = () => {
        setModalOpen(false)
    }

    const handleConfirm = () => {
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
                    }

                    deleteBookingAdjustment(number, formRequest)
                        .then(response => {
                            if (response?.status.code != 200) {
                                return
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
        <>
            <form onSubmit={handleSubmit}>
                <div className="d-grid grid-cols-2 gap-3">
                    <Input
                        wrapperClassName="grid-span-2"
                        disabled
                        name="requestType"
                        label="Adjustment Type"
                        value={booking?.adjustmentRequest.type.name || '-'}
                    />
                    <Input
                        wrapperClassName="grid-span-2"
                        disabled
                        name="requestType"
                        label="Status"
                        value={booking?.adjustmentRequest.status.name || '-'}
                    />
                    { booking?.adjustmentRequest.schedule ? (
                        <>
                            <Input
                                disabled
                                name="requestDate"
                                label="Requested Session Date"
                                value={booking?.adjustmentRequest.schedule.date || '-'}
                            />
                            <Input
                                disabled
                                name="requestTime"
                                label="Requested Session Time"
                                value={booking?.adjustmentRequest.schedule.fromTime || '-'}
                            />
                        </>
                    ) : (<></>) }
                    { booking?.adjustmentRequest?.status?.id != APPROVED_ID ? (
                        <div className="d-grid grid-span-2">
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
                                Cancel Adjustment Request
                            </Button>
                        </div>
                    ) : (<></>) }
                </div>
            </form>
            <Modal
                preventClose
                open={modalOpen}
                onHide={handleHide}
            >
                <div className="text-center p-2">
                    <div className="mb-3">
                        <h6 
                            className={`${
                                "fw-normal fs-5"
                            }`}
                        >
                            Are you sure you want to cancel your adjustment?
                        </h6>
                    </div>
                    <div className="d-grid gap-3 grid-cols-md-2 pt-2">
                        <Button
                            disabled={isSending}
                            data-bs-dismiss="modal"
                            pill
                        >
                            No
                        </Button>
                        <Button
                            outline
                            disabled={isSending}
                            onClick={handleConfirm}
                            pill
                        >
                            <Loader 
                                hidden={!isSending} 
                                small
                            />
                            {' '}
                            Yes
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )

}