import { BookingForm } from "@/event-booking/components/booking-form/components"
import { findEventTypePackage } from "@/event-booking/services/getEventType"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

interface Slugs {
    eventTypeSlug   : string
    packageSlug     : string
}

interface Props {
    params      : Promise<Slugs>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { eventTypeSlug, packageSlug } = await params
    const eventPackage = await findEventTypePackage(eventTypeSlug, packageSlug)

    let title       = 'Package not found'
    let description = 'Package not found'
    if (eventPackage?.result?.name) {
        title       = `Book ${eventPackage.result.eventType.name} ${eventPackage.result.name}`
        description = eventPackage.result.description
    }

    return {
        title       : `${title} | ${process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto'}`,
        description : description
    }
}

export default async function BookingPage ({ params, searchParams } : Props) {
    const { eventTypeSlug, packageSlug } = await params
    const eventPackage = await findEventTypePackage(eventTypeSlug, packageSlug)

    if (!eventPackage?.result) {
        notFound()
    }

    return (
        <>
            { eventPackage.result ? (
                <BookingForm eventPackage={eventPackage?.result}/>
            ) : (<></>) }
            <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}/>
        </>
    )
}
