import { FC } from "react";
import { getEventTypePackages } from "@/event-booking/services/getEventType";
import { Card } from "@/components/cards/card";
import { Check } from "react-feather";
import { LinkButton } from "@/components/buttons";
import { formatCurrency } from "@/helpers/formatter/functions";
import { Animation } from "@/components/animation";
import { VarelaRound } from "@/configs/fonts";
import { PackageCard } from "../package-card";

interface Props {
    eventTypeName: string
    eventTypeSlug: string
}

export const Packages : FC<Props> = async ({
    eventTypeName,
    eventTypeSlug
}) => {
    const packagesResponse = await getEventTypePackages(eventTypeSlug)

    return (
        <section className="landing-container intro-section">
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
                    { eventTypeName } Packages
                </h2>
                <p>
                    Choose the package fitting your { eventTypeName.toLowerCase() }
                </p>
            </Animation>
            <div 
                className="d-flex gap-2 align-items-stretch justify-content-center"
            >
                {!packagesResponse?.result?.length ? (
                    <div className="text-center">
                        <h5>No Packages Found</h5>
                    </div>
                ) : packagesResponse.result.map((eventPackage, index) => (
                    <PackageCard
                        key={`event-package-${eventPackage.id}`}
                        eventPackage={eventPackage}
                        eventTypeSlug={eventTypeSlug}
                        show={index == 0}
                    />
                ))}
            </div>
        </section>
    )
}