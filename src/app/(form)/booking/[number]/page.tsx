import { SelfAdjustmentSection } from "@/book/components/self-adjustment-form";
import { findPublicLinkByCode } from "@/module/misc/services/public-links";
import { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

interface Props {
    params      : Promise<{number: string}>
    searchParams: Promise<{ code: string } | Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { number }= await params
    const { code }  = await searchParams

    const publicLink = await findPublicLinkByCode(code as string || '', number || '')
    if (!publicLink?.result?.code) {
        return {
            title: `Invalid Self-Adjustment Page | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            description: 'Invalid self-adjustment page, please make sure the URL you inputted is correct'
        }
    }

    let title       = `Appointment ${number} Self-Adjustment`
    let description = `Reschedule or cancel appointment #${number}`

    return {
        title       : `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description : description
    }
}


const BookingPage = async ({ params, searchParams }: Props) => {
    const { number }    = await params
    const { code }      = await searchParams

    const requestHeaders= headers()
    const url           = `https://${requestHeaders.get('host')}/booking/${number}?code=${code}`
    const publicLink    = await findPublicLinkByCode(code as string || '', number)

    return (
        <>
            { !publicLink?.result?.code ? (
                <section>
                    <h1 className="pb-2 mb-1 page-title bold">
                        INVALID LINK
                    </h1>
                    <p className="fw-light mb-1">
                        The link is incorrect or has already been expired
                    </p>
                </section>
            ) : (
                <SelfAdjustmentSection
                    code={code as string}
                    number={number}
                    url={url}
                    booking={publicLink.result.reference}
                />
            ) }
            <Script 
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
            />
        </>
    )
}

export default BookingPage
