'use client'

import { FC, FormEventHandler, useCallback, useState } from "react"
import { SelfAdjustmentProps } from "./props"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/brandings"
import { Calendar, ChevronLeft, Slash } from "react-feather"
import { CancelForm } from "../cancel-form"
import { RescheduleForm } from "../reschedule-form"

export const SelfAdjustmentSection : FC<SelfAdjustmentProps> = ({ 
    number,
    url,
    code,
    booking
}) => {

    const [type, setType] = useState<'cancel'|'reschedule'>()

    const handleBack = useCallback(() => {
        setType(undefined)
    }, [])

    if (type == 'cancel') {
        return (
            <CancelForm
                number={number}
                code={code}
                url={url}
                onBack={handleBack}
            />
        )
    }

    if (type == 'reschedule') {
        return (
            <RescheduleForm
                number={number}
                code={code}
                url={url}
                booking={booking}
                onBack={handleBack}
            />
        )
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
                    Self Adjustment Appointment <span className="fw-semibold">#{ number }</span>
                </h1>
            </div>
            <div className="min-h-screen-60">
                <div className="d-grid grid-cols-2 gap-3">
                    <div 
                        className="card selectable grid-span-2 grid-span-md-1"
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
                        className="card selectable grid-span-2 grid-span-md-1"
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
            </div>
        </section>
    )

}