'use client'

import { FC } from "react";
import { Props } from "./props";
import { useEventLandingContext } from "@/event-booking/contexts/EventLandingContext";
import { Animation } from "@/components/animation";
import { VarelaRound } from "@/configs/fonts";
import { LinkButton } from "@/components/buttons";
import { Thumbnail } from "@/components/layouts/thumbnail";
import { useMediaQuery } from "@/hooks/media-query";

export const EventTypeList : FC<Props> = ({
    eventTypes
}) => {
    const { expanded } = useEventLandingContext()
    const isLg = useMediaQuery("(min-width: 992px)")

    if (!expanded) {
        return (<></>)
    }

    return (
        <>
            <Animation
                animation="slide-to-up"
                show
                className="text-center pb-5 mb-2"
                wrapperClassName="mb-5"
            >
                <h2
                    className={`${
                        VarelaRound.className
                    }`}
                >
                    Event Packages
                </h2>
                <p>
                    Choose the package fitting your special event
                </p>
            </Animation>
            <div className="d-flex flex-column intro-flex no-gap align-items-stretch w-100">
                { !eventTypes?.length ? (
                    <div className="text-center">
                        <h5>No Event Type Found</h5>
                    </div>
                ) : eventTypes.map((eventType, index) => (
                    <div 
                        className="d-grid grid-cols-lg-2 justify-content-stretch intro no-gap"
                        key={`event-type-${eventType.id}-${index}`}
                    >
                        { isLg ? (
                            <>
                                { !(index % 2) ? (
                                    <>
                                        <Animation
                                            animation="slide-to-right"
                                            className="text-center d-flex h-100 flex-column align-items-center justify-content-center"
                                            show={index == 0}
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
                                            show={index == 0}
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
                                        >
                                            <Thumbnail
                                                src={eventType.thumbnail}
                                                alt={`${eventType.name} thumbnail`}
                                            />
                                        </Animation>
                                        <Animation 
                                            animation="slide-to-left"
                                            className="text-center d-flex h-100 flex-column align-items-center justify-content-center"
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
                            </>
                        ) : (
                            <Animation
                                animation="slide-to-up"
                                className="border border-grey-900 p-4 rounded-5"
                            >
                                <div className="mobile-event-card d-flex flex-column">
                                    <Thumbnail
                                        className="small"
                                        src={eventType.thumbnail}
                                        alt={`${eventType.name} thumbnail`}
                                    />
                                    <div className="text-center d-flex h-100 flex-column align-items-center justify-content-center">
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
                                    </div>
                                </div>
                            </Animation>
                        ) }
                    </div>
                )) }
            </div>
        </>
    )
}