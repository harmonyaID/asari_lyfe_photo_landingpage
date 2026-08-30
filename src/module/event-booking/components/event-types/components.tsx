import { FC, Fragment } from "react";
import { NunitoSans, VarelaRound } from "@/configs/fonts";
import { Animation } from "@/components/animation";
import { Thumbnail } from "@/components/layouts/thumbnail";
import { LinkButton } from "@/components/buttons";
import { getEventTypes } from "@/event-booking/services/getEventType";

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
            <div className="d-flex flex-column intro-flex align-items-stretch w-100">
                { eventTypes?.result?.map((eventType, index) => (
                    <div 
                        className="d-grid grid-cols-lg-5 justify-content-stretch intro"
                        key={`event-type-${eventType.id}-${index}`}
                    >
                        { !(index % 2) ? (
                            <>
                                <Animation
                                    animation="slide-to-right"
                                    wrapperClassName="grid-span-lg-3"
                                >
                                    <h2 className={VarelaRound.className}>
                                        { eventType.name }
                                    </h2>
                                    <hr />
                                    <p>
                                        { eventType.description }
                                    </p>
                                    <LinkButton
                                        href={`/event-booking/${eventType.slug}`}
                                    >
                                        See Packages
                                    </LinkButton>
                                </Animation>
                                <Animation 
                                    animation="slide-to-left"
                                    wrapperClassName="grid-span-lg-2"
                                >
                                    <Thumbnail
                                        src={eventType.thumbnail}
                                        alt={`${eventType.name} thumbnail`}
                                    />
                                </Animation>
                            </>
                        ) : (
                            <>
                                <Animation 
                                    animation="slide-to-right"
                                    wrapperClassName="grid-span-lg-2"
                                >
                                    <Thumbnail
                                        src={eventType.thumbnail}
                                        alt={`${eventType.name} thumbnail`}
                                    />
                                </Animation>
                                <Animation 
                                    animation="slide-to-left"
                                    wrapperClassName="grid-span-lg-3"
                                    className="text-end"
                                >
                                    <h2 className={VarelaRound.className}>
                                        { eventType.name }
                                    </h2>
                                    <hr />
                                    <p>
                                        { eventType.description }
                                    </p>
                                    <LinkButton
                                        href={`/event-booking/${eventType.slug}`}
                                    >
                                        See Packages
                                    </LinkButton>
                                </Animation>
                            </>
                        ) }
                    </div>
                )) }
            </div>
        </section>
    )
}