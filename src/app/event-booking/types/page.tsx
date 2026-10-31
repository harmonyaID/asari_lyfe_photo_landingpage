import { Metadata } from "next";
import { HeadlineSetter } from "@/event-booking/components/headline-setter";
import { EventTypes } from "@/event-booking/components/event-types";
import { EventTypeIntro } from "@/event-booking/components/event-type-intro";

export const metadata: Metadata = {
    title: `Memorable Event Imaging Provider - Event Types | ${ process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto' }`,
}

export default function EventBookingTypes() {
    return (
        <>
            <EventTypes/>
            <HeadlineSetter imgUrl=""/>
        </>
    )
}
