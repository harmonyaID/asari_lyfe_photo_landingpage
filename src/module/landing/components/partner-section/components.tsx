import { Animation } from "@/components/animation";
import { LinkButton } from "@/components/buttons";
import { Section } from "@/components/layouts/section";
import { VarelaRound } from "@/configs/fonts";
import { FC } from "react";

export const PartnerSection : FC = () => (
    <Section
        id="partner"
        observable
        className="partner"
    >
        <header className="text-center">
            <Animation
                animation="slide-to-up"
            >
                <h2 className={VarelaRound.className}>
                    This Is Our Partners
                </h2>
            </Animation>
            <hr/>
        </header>
        <section className="partner-list landing-container d-flex justify-content-between">
            <img
                src="/images/logos/mason-pine.webp"
                alt="Mason Pine"
                title="Mason Pine"
                height={120}
                width="auto"
            />
            <img
                src="/images/logos/intercontinental.webp"
                alt="Intercontinental Bandung"
                title="Intercontinental Bandung"
                height={120}
                width="auto"
            />
            <img
                src="/images/logos/marriott.webp"
                alt="Marriott Resort Lampung"
                title="Marriott Resort Lampung"
                height={120}
                width="auto"
            />
            <img
                src="/images/logos/le-eminence.webp"
                alt="Le Eminence Puncak"
                title="Le Eminence Puncak"
                height={120}
                width="auto"
            />
        </section>
        <section className="landing-container">
            <div
                className={`${
                    VarelaRound.className
                } ${
                    "bg-dark text-white d-flex align-items-center justify-content-between book position-relative"
                }`}
            >
                <h3 className="mb-0">
                    Want memorable staycation photo service in your Hotel & Resort?
                </h3>
                <LinkButton
                    href="/book"
                >
                    Book Appointment Now
                </LinkButton>
                <img
                    src="/images/misc/ornament.svg"
                    className="ornament position-absolute"
                />
            </div>
        </section>
    </Section>
)