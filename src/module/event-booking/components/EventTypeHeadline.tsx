import { Animation } from "@/components/animation";
import { NotoSans, VarelaRound } from "@/configs/fonts";
import { FC } from "react";
import { EventType } from "../types/event-type";

interface Props {
    eventType: EventType
}

export const EventTypeHeadline: FC<Props> = ({
    eventType
}) => (
    <section
        className="main-headline radius-reverse position-relative overflow-hidden"
    >
        <img
            className="position-absolute top-0 start-0 end-0 bottom-0"
            src={eventType.thumbnail}
            alt={`${eventType.name} thumbnail`}
        />
        <div className="landing-container h-100 position-relative">
            <div className="headline-text h-100 d-flex flex-column justify-content-center align-items-start">
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
                        { eventType.name }
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
                        { eventType.description }
                    </p>
                </Animation>
            </div>
        </div>
    </section>
)