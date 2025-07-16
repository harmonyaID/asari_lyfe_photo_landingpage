import { BookingNumber } from "@/book/components/booking-number";
import { SuccessNotification } from "@/book/components/success-notification";
import { LinkButton } from "@/components/buttons";
import { SuccessIcon } from "@/components/icons";
import { FC } from "react";

const SuccessPage : FC = () => (
    <section>
        <SuccessNotification/>
        <div className="pb-3 mb-5">
            <SuccessIcon/>
        </div>
        <h1 className="pb-2 mb-1 page-title bold">
            BOOKING SUCESS
        </h1>
        <p className="fw-light mb-1">
            Successfully booked an appointment, our team will reach you as soon as possible
        </p>
        <p className="fw-light mb-1">
            Booking number
        </p>
        <BookingNumber
            className="mb-5"
        />
        <div className="d-grid">
            <LinkButton href="/" pill>
                Back to Home
            </LinkButton>
        </div>
    </section>
)

export default SuccessPage