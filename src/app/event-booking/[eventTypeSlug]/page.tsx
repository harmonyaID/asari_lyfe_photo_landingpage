import { LandingProvider } from "@/app/providers"
import { Navbar } from "@/components/navigations/navbar"
import { Footer } from "@/landing/components"
import { EventTypeHeadline } from "@/event-booking/components/event-type-headline"
import { Packages } from "@/event-booking/components/packages"
import { findEventType } from "@/event-booking/services/getEventType"
import { Metadata } from "next"

interface Props {
    params: Promise<{ eventTypeSlug: string }>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { eventTypeSlug }  = await params
    const eventType  = await findEventType(eventTypeSlug)

    let title       = 'Book Your Photo Session'
    let description = ''
    if (eventType?.result?.name) {
        title       = `Book Your ${eventType.result.name} Photo Session`
        description = `${eventType.result.description}`
    }

    return {
        title       : `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description : description
    }
}

export default async function Page({ params, searchParams } : Props) {
    const { eventTypeSlug } = await params
    const eventTypeResponse = await findEventType(eventTypeSlug)

    return (
        <LandingProvider>
            <Navbar hideBookButton/>
            { eventTypeResponse?.result ? (
                <>
                    <EventTypeHeadline
                        eventType={eventTypeResponse?.result}
                    />
                    <Packages
                        eventTypeSlug={eventTypeSlug}
                    />
                </>
            ) : (
                <></>
            ) }
            <Footer/>
        </LandingProvider>
    )
}