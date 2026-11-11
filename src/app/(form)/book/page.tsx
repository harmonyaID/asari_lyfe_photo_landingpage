import { BookingForm } from "@/book/components/booking-form";
import { getAppName } from "@/helpers/app/functions";
import { getAppSettings } from "@/setting/services/app-setting";
import { Metadata } from "next";
import Script from "next/script";
import { FC } from "react";


export async function generateMetadata() : Promise<Metadata> {

    const appName = await getAppName()

    return {
        title: `Book Your Photo Session | ${ appName }`,
        description: "Book your photo session with our team",
    }
}

const BookingPage : FC = () => (
    <>
        <BookingForm/>
        <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}/>
    </>
)

export default BookingPage
