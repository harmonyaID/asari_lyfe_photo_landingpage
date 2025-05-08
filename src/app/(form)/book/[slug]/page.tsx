import { BookingForm } from "@/book/components/booking-form";
import { findLocationBySlug } from "@/location/services/findLocationBySlug";
import { Metadata } from "next";
import Script from "next/script";

interface Props {
    params      : Promise<{slug: string}>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { slug }  = await params
    const location  = await findLocationBySlug(slug)

    let title       = 'Book Your Photo Session'
    let description = 'Book your photo session with our team'
    if (location?.result?.name) {
        title       = `${title} at ${location.result.name}`
        description = `${description} at ${location.result.name}`
    }

    return {
        title       : `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description : description
    }
}


const BookingPage = async ({ params, searchParams }: Props) => {
    const { slug }  = await params
    const location  = await findLocationBySlug(slug)

    return (
        <>
            <BookingForm location={ location?.result || undefined }/>
            <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}/>
        </>
    )
}

export default BookingPage
