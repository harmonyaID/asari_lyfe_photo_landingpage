import { Metadata } from "next";
import { HeadlineSetter } from "@/event-booking/components/headline-setter";
import { EventTypes } from "@/event-booking/components/event-types";
import { EventTypeIntro } from "@/event-booking/components/event-type-intro";
import { getAppSettings } from "@/setting/services/app-setting";
import { getAppName } from "@/helpers/app/functions";


export async function generateMetadata() : Promise<Metadata> {
    
    const appName = await getAppName()
    
    return  {
        title: `Memorable Event Imaging Provider - Event Types | ${ appName }`,
    }
}


export default function EventBookingTypes() {
    return (
        <>
            <EventTypes/>
            <HeadlineSetter imgUrl=""/>
        </>
    )
}
