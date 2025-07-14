import Link from "next/link";
import { FC } from "react";

export const BookBtn : FC = () => (
    <Link 
        href="/book"
        target="_blank"
        className="d-block position-fixed bottom-0 end-0 book-btn cursor-pointer"
    >
        <img 
            src="/images/misc/booking-btn.webp"
            alt="Booking Button"
            title="Book Now"
            width={72}
            height={72}
        />
    </Link>
)