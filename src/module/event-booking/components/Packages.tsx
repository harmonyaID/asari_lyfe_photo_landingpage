import { FC } from "react";
import { getEventTypePackages } from "../services/getEventType";
import { Card } from "@/components/cards/card";
import { Check } from "react-feather";
import { LinkButton } from "@/components/buttons";

interface Props {
    eventTypeSlug: string
}

export const Packages : FC<Props> = async ({
    eventTypeSlug
}) => {
    const packagesResponse = await getEventTypePackages(eventTypeSlug)

    return (
        <section className="landing-container intro-section">

            <div 
                className="d-flex gap-2 align-items-stretch justify-content-center"
            >
                {packagesResponse?.result?.map((eventPackage) => (
                    <Card
                        key={`package-${eventPackage.id}`}
                        imgUrl={eventPackage.thumbnail}
                        className="package-card"
                    >
                        <div className="d-flex h-100 gap-4 flex-column justify-content-between">
                            <div>
                                <h5 className="card-title">
                                    { eventPackage.name }
                                </h5>
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
                            </div>
                            <LinkButton
                                href={`/book/event/${eventTypeSlug}/${eventPackage.id}`}
                                className="text-center"
                                target="_blank"
                            >
                                Book
                            </LinkButton>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}