'use client';

import { Animation } from "@/components/animation";
import { Button } from "@/components/buttons";
import { NotoSans, VarelaRound } from "@/configs/fonts";
import { useEventLandingContext } from "@/event-booking/contexts/EventLandingContext";
import { FC } from "react";

export const EventHeadline: FC = () => {

    const { expanded, setExpanded } = useEventLandingContext()

    return (
        <section
            className={`${
                "main-headline radius-reverse position-relative overflow-hidden"
            } ${
                expanded ? 'wrapped' : 'full-screen'
            }`}
        >
            <img
                className="position-absolute top-0 start-0 end-0 bottom-0"
                srcSet="/images/events/headline-1280.webp 900w, /images/events/headline-1600.webp 1280w, /images/events/headline.webp 1600w"
                src="/images/events/headline.webp"
                alt="Backdrop"
            />
            <div className="landing-container h-100 position-relative">
                <div className="headline-text h-100 d-flex flex-column justify-content-center align-items-start">
                    { !expanded ? (
                        <>
                            <Animation
                                animation="slide-to-up"
                                delay={900}
                                show
                            >
                                <h1 
                                    className={`${
                                        "text-white"
                                    } ${
                                        VarelaRound.className
                                    }`}
                                >
                                    Memorable<br/>Event Imaging
                                </h1>
                            </Animation>
                            <Animation
                                animation="slide-to-bottom"
                                delay={1000}
                                show
                            >
                                <p 
                                    className={`${
                                        "text-white"
                                    } ${
                                        NotoSans.className
                                    }`}
                                >
                                    Lyfe Foto is Memorable Imaging provider to your events.
                                </p>
                            </Animation>
                            <Animation
                                animation="fade-in"
                                delay={1500}
                                show
                            >
                                <Button
                                    onClick={() => setExpanded(true)}
                                >
                                    Show Package
                                </Button>
                            </Animation>
                        </>
                    ) : (<></>) }
                </div>
            </div>
        </section>
    )
}