import { FC } from "react";
import { NunitoSans } from "@/configs/fonts";
import { getEventTypes } from "@/event-booking/services/getEventType";
import { EventTypeList } from "../event-type-list";

export const EventTypes : FC = async () => {
    const eventTypes = await getEventTypes()

    return (
        <section 
            className={`${
                "landing-container intro-section"
            } ${
                NunitoSans.className
            }`}
        >
            <EventTypeList
                eventTypes={eventTypes?.result || []}
            />
        </section>
    )
}