import { BookingNumber } from "@/book/components/booking-number";
import { LinkButton } from "@/components/buttons";
import { SuccessIcon } from "@/components/icons";
import { FC } from "react";

const SuccessPage : FC = () => (
    <section>
        <div className="pb-3 mb-5">
            <SuccessIcon/>
        </div>
        <h1 className="pb-2 mb-1 page-title bold">
            BOOKING SUCESS
        </h1>
        <p className="fw-light mb-1">
            Photo session successfully booked, our admin will contact you through
            your Whatsapp number or email address
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