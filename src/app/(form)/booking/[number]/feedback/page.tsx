import { FeedbackForm } from "@/book/components/feedback-form"
import { getAppName } from "@/helpers/app/functions"
import { findPublicLinkByCode } from "@/module/misc/services/public-links"
import { Metadata } from "next"
import { headers } from "next/headers"
import Script from "next/script"

interface Props {
    params : Promise<{number: string}>
    searchParams: Promise<{code: string} | Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { number } = await params
    const { code } = await searchParams

    const appName = getAppName()

    const publicLink = await findPublicLinkByCode(code as string || '', number || '')
    if (!publicLink?.result?.code) {
        return {
            title: `Invalid Booking Feedback Page | ${appName}`,
            description: 'Invalid feedback page, please make sure the URL you inputted is correct'
        }
    }

    let title       = `Booking ${number} Feedback`
    let description = `Feedback form for booking #${number}`

    return {
        title       : `${title} | ${appName}`,
        description : description
    }
}

const FeedbackPage = async ({ params, searchParams } : Props) => {
    const { number }    = await params
    const { code }      = await searchParams

    const requestHeaders= headers()
    const url           = `https://${requestHeaders.get('host')}/booking/${number}/feedback?code=${code}`
    const publicLink    = await findPublicLinkByCode(code as string || '', number)

    console.log('A', publicLink)

    return (
        <>
            { publicLink?.status?.code != 200 ? (
                <section>
                    <h1 className="pb-2 mb-1 page-title bold">
                        INVALID LINK
                    </h1>
                    <p className="fw-light mb-1">
                        { publicLink?.status.message || 'The link is incorrect or has already been expired' }
                    </p>
                </section>
            ) : (
                <FeedbackForm
                    number={number}
                    code={code as string}
                />
            ) }

            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
            />
        </>
    )
}

export default FeedbackPage