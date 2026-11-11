import { LandingProvider } from "@/app/providers"
import { Navbar } from "@/components/navigations/navbar"
import { Footer } from "@/landing/components"
import { EventTypeHeadline } from "@/event-booking/components/event-type-headline"
import { Packages } from "@/event-booking/components/packages"
import { findEventType } from "@/event-booking/services/getEventType"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HeadlineSetter } from "@/event-booking/components/headline-setter"
import { getAppSettings } from "@/setting/services/app-setting"
import { getAppName } from "@/helpers/app/functions"

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
    
    const appName = await getAppName()

    return {
        title       : `${title} | ${appName}`,
        description : description
    }
}

export default async function Page({ params, searchParams } : Props) {
    const { eventTypeSlug } = await params
    const eventTypeResponse = await findEventType(eventTypeSlug)

    if (!eventTypeResponse?.result) {
        notFound()
    }

    return (
        <>
            <Packages
                eventTypeName={eventTypeResponse.result.name}
                eventTypeSlug={eventTypeSlug}
            />
            <HeadlineSetter
                imgUrl={eventTypeResponse.result.thumbnail}
            />
        </>
    )
}