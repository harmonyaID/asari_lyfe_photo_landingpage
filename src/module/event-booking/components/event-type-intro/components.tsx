import { Animation } from "@/components/animation";
import { VarelaRound } from "@/configs/fonts";
import { FC } from "react";

export const EventTypeIntro : FC = () => {
    return (
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
    )
}