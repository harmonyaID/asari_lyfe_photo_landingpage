import { BookingForm } from "@/book/components/booking-form";
import Script from "next/script";
import { FC } from "react";

const BookingPage : FC = () => (
    <>
        <BookingForm/>
        <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}/>
    </>
)

export default BookingPage
