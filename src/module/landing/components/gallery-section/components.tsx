import { Animation } from "@/components/animation";
import { Section } from "@/components/layouts/section";
import { VarelaRound } from "@/configs/fonts";
import { FC } from "react";
import { Gallery } from "../gallery/components";

export const GallerySection : FC = () => (
    <Section
        id="portfolio"
        observable
        ratio={.3}
        className="gallery"
    >
        <header className="text-center">
            <Animation
                animation="slide-to-up"
            >
                <h2 className={VarelaRound.className}>
                    Here{"'"}s some Our Works
                </h2>
            </Animation>
            <hr />
        </header>
        <Gallery/>
    </Section>
)