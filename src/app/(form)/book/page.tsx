import { BookingForm } from "@/book/components/booking-form";
import { Metadata } from "next";
import Script from "next/script";
import { FC } from "react";

export const metadata: Metadata = {
    title: `Book Your Photo Session - ${ process.env.NEXT_PUBLIC_APP_NAME }`,
    description: "Book your photo session with our team",
};

const BookingPage : FC = () => (
    <>
        <BookingForm/>
        <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}/>
    </>
)

export default BookingPage
