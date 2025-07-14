import { Animation } from "@/components/animation";
import { Section } from "@/components/layouts/section";
import { NotoSans, VarelaRound } from "@/configs/fonts";
import { FC } from "react";

export const MainHeadline : FC = () => (
    <Section
        id="home"
        observable
        className="main-headline position-relative overflow-hidden"
    >
        <img
            className="position-absolute top-0 start-0 end-0 bottom-0"
            srcSet="/images/background-1280.webp 900w, /images/background-1600.webp 1280w, /images/background.webp 1600w"
            src="/images/background.webp"
            alt="Backdrop"
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
                        Memorable Staycation Imaging
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
                        Lyfe Foto is Memorable Family Staycation Imaging provider to hotel & resort industry.
                    </p>
                </Animation>
            </div>
        </div>
    </Section>
)