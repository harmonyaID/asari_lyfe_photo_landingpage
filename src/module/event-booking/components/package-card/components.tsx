'use client'

import { FC } from "react"
import { Props } from "./props"
import { useMediaQuery } from "@/hooks/media-query"
import { Animation } from "@/components/animation"
import { LinkButton } from "@/components/buttons"
import { formatCurrency } from "@/helpers/formatter/functions"
import { Check } from "react-feather"

export const PackageCard : FC<Props> = ({
    eventPackage,
    eventTypeSlug,
    show
}) => {
    const isLg = useMediaQuery("(min-width: 992px)")

    return (
        <Animation
            animation="slide-to-up"
            className="border border-grey-900 rounded-5 p-4 event-package-card d-flex align-items-stretch gap-4"
            show={show}
        >
            { isLg ? (
                <div className="thumbnail rounded-5 overflow-hidden">
                    <img
                        className="object-fit-cover h-100 w-100"
                        src={eventPackage.thumbnail}
                        loading="lazy"
                    />
                </div>
            ) : (<></>) }
            <div className="d-flex gap-3 w-100 package-description">
                <section>
                    <h5 className="card-title">
                        { eventPackage.name }
                    </h5>
                    <h6>
                        { formatCurrency(eventPackage.price, eventPackage.currency.symbol || eventPackage.currency.name) }
                    </h6>
                    { eventPackage.complimentaries?.map((complimentary) => (
                        <div 
                            key={`complimentary-${eventPackage.id}-${complimentary.id}`}
                            className="d-flex gap-1 align-items-center"
                        >
                            <div className="flex-grow-0 flex-shrink-0">
                                <Check
                                    className="text-primary"
                                />
                            </div>
                            <div className="flex-grow-1">
                                { complimentary.name }
                            </div>
                        </div>
                    )) }
                </section>
                <LinkButton
                    href={`/book/event/${eventTypeSlug}/${eventPackage.slug}`}
                    className="text-center"
                    target="_blank"
                >
                    Book Now
                </LinkButton>
            </div>
        </Animation>
    )
}