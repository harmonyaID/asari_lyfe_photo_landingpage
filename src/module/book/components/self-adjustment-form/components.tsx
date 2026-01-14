'use client'

import { FC, FormEventHandler, useCallback, useEffect, useState } from "react"
import { SelfAdjustmentProps } from "./props"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/brandings"
import { Calendar, ChevronLeft, Slash } from "react-feather"
import { CancelForm } from "../cancel-form"
import { RescheduleForm } from "../reschedule-form"
import { Button } from "@/components/buttons"
import { Input } from "@/components/inputs"
import { SelfAdjustmentDetail } from "../self-adjustment-detail"
import { APPROVED_ID } from "@/book/constants/BookingAdjustmentRequestStatus"
import { CANCELLATION_ID, RESCHEDULE_ID } from "@/book/constants/BookingAdjustmentRequestType"

export const SelfAdjustmentSection : FC<SelfAdjustmentProps> = ({ 
    number,
    url,
    code,
    booking
}) => {

    const [type, setType] = useState<'cancel'|'reschedule'>()
    const router = useRouter()

    const handleBack = useCallback(() => {
        setType(undefined)
    }, [])

    useEffect(() => {
        if (booking?.adjustmentRequest?.status?.id != APPROVED_ID) {
            return
        }

        if (booking.adjustmentRequest.type.id == CANCELLATION_ID) {
            router.push('cancel-success')
        }

        if (booking.adjustmentRequest.type.id == RESCHEDULE_ID) {
            router.push('reschedule-success')
        }
    }, [])

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
                    { booking?.adjustmentRequest ? (
                        <>
                            Booking <span className="fw-semibold">#{ number }</span> Adjustment Requested
                        </>
                    ) : type == 'reschedule' ? (
                        <>
                            Reschedule Appointment <span className="fw-semibold">#{ number }</span>
                        </>
                    ) : type == 'cancel' ? (
                        <>
                            Cancel Appointment <span className="fw-semibold">#{ number }</span>
                        </>
                    ) : (
                        <>
                            Self Adjustment Appointment <span className="fw-semibold">#{ number }</span>
                        </>
                    ) }
                </h1>
            </div>
            <div className="min-h-screen-60">
                <div className="d-grid grid-cols-2 gap-3">
                    { type ? (
                        <div className="pb-1 grid-span-2">
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
                    ) : (<></>) }
                    { !type || booking?.adjustmentRequest ? (
                        <>
                            <Input
                                wrapperClassName="grid-span-2"
                                readOnly
                                name="name"
                                label="Name"
                                value={booking?.name || '-'}
                            />
                            <Input
                                readOnly
                                name="email"
                                label="Email"
                                value={booking?.email || '-'}
                            />
                            <Input
                                readOnly
                                name="phone"
                                label="Phone"
                                value={booking?.phone || '-'}
                            />
                            <Input
                                wrapperClassName="grid-span-2"
                                readOnly
                                name="location"
                                label="Location"
                                value={booking?.location?.name || '-'}
                            />
                            <Input
                                readOnly
                                name="date"
                                label="Session Date"
                                value={booking?.date || '-'}
                            />
                            <Input
                                readOnly
                                name="time"
                                label="Session Time"
                                value={booking?.time || '-'}
                            />
                            { !booking?.adjustmentRequest ? (
                                <div className="d-grid grid-cols-1 grid-cols-md-2 gap-3 grid-span-2">
                                    <div 
                                        className="card selectable"
                                        onClick={() => setType('reschedule')}
                                    >
                                        <div className="card-body text-center">
                                            <Calendar
                                                size="3rem"
                                                strokeWidth={1}
                                                className="text-primary"
                                            />
                                            <div className="fw-semibold">
                                                Reschedule
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className="card selectable"
                                        onClick={() => setType('cancel')}
                                    >
                                        <div className="card-body text-center">
                                            <Slash
                                                size="3rem"
                                                strokeWidth={1}
                                                className="text-primary"
                                            />
                                            <div className="fw-semibold">
                                                Cancel
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid-span-2">
                                    <SelfAdjustmentDetail
                                        number={number}
                                        code={code}
                                        booking={booking}
                                    />
                                </div>
                            ) }
                        </>
                    ) : type == 'cancel' ? (
                        <div className="grid-span-2">
                            <CancelForm
                                number={number}
                                code={code}
                                url={url}
                                onSuccess={handleBack}
                            />
                        </div>
                    ) : (
                        <div className="grid-span-2">
                            <RescheduleForm
                                number={number}
                                code={code}
                                url={url}
                                booking={booking}
                                onSuccess={handleBack}
                            />
                        </div>
                    ) }
                </div>
            </div>
        </section>
    )

}