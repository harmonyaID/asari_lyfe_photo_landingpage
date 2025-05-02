import { Animation } from "@/components/animation";
import { Poppins, VarelaRound } from "@/configs/fonts";
import { FC } from "react";

export const SubjectSection : FC = () => (
    <section
        className="d-grid grid-cols-lg-2 w-100 subject"
    >
        <div
            className="position-relative overflow-hidden"
        >
            <Animation
                animation="lighten"
                className="h-100 w-100 overflow-hidden"
            >
                <img
                    src="/images/thumbnails/outdoor-location.webp"
                    alt="Outdoor locations"
                    className="object-fit-cover h-100 w-100"
                />
            </Animation>
            <Animation
                className="overlay"
                animation="lighten"
            />
            <div className="content">
                <Animation
                    animation="slide-to-up"
                    delay={350}
                    className="text-white"
                >
                    <h2 className={Poppins.className}>
                        WE TAKE PHOTO OUTDOORS IN
                    </h2>
                </Animation>
                <Animation
                    animation="slide-to-bottom"
                    delay={350}
                    className="text-white"
                >
                    <p 
                        className={`${
                            "mb-0"
                        } ${
                            VarelaRound.className
                        }`}
                    >
                        Garden, Pool, Rooftop, Etc.
                    </p>
                </Animation>
            </div>
        </div>
        <div
            className="position-relative overflow-hidden text-end"
        >
            <Animation
                animation="lighten"
                className="h-100 w-100 overflow-hidden"
            >
                <img
                    src="/images/thumbnails/subject.webp"
                    alt="Outdoor locations"
                    className="object-fit-cover h-100 w-100"
                />
            </Animation>
            <Animation
                className="overlay"
                animation="lighten"
            />
            <div className="content">
                <Animation
                    animation="slide-to-up"
                    delay={350}
                    className="text-white"
                >
                    <h2 className={Poppins.className}>
                        WE CAPTURE
                    </h2>
                </Animation>
                <Animation
                    animation="slide-to-bottom"
                    delay={350}
                    className="text-white"
                >
                    <p 
                        className={`${
                            "mb-0"
                        } ${
                            VarelaRound.className
                        }`}
                    >
                        Family, Kids, Couple, Etc.
                    </p>
                </Animation>
            </div>
        </div>
    </section>
)