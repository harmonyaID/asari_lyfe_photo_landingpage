import { Animation } from "@/components/animation";
import { NunitoSans, VarelaRound } from "@/configs/fonts";
import { FC } from "react";

export const HotelBenefitSection : FC = () => (
    <section className="hotel-benefit">
        <header className="text-center">
            <Animation
                animation="slide-to-up"
            >
                <h2 className={VarelaRound.className}>
                    What Are The Hotel Benefit?
                </h2>
            </Animation>
            <hr />
        </header>
        <Animation 
            animation="slide-to-bottom"
            className="landing-container d-grid grid-cols-3"
        >
            <section>
                <div className="img-container overflow-hidden mb-3">
                    <img
                        className="object-fit-cover h-100 w-100"
                        src="/images/thumbnails/benefit-engaging.webp"
                        alt="Engaging Activity"
                    />
                </div>
                <h3 className={NunitoSans.className}>
                    Engaging Activity
                </h3>
                <p className={NunitoSans.className}>
                    Every guest can enjoy an engaging and fun photo session with their family for free, adding more value to their staycation at the hotel.
                </p>
            </section>
            <section>
                <div className="img-container overflow-hidden mb-3">
                    <img
                        className="object-fit-cover h-100 w-100"
                        src="/images/thumbnails/benefit-gift.webp"
                        alt="Memorable Gift"
                    />
                </div>
                <h3 className={NunitoSans.className}>
                    Memorable Gift
                </h3>
                <p className={NunitoSans.className}>
                    Guests will receive a free framed photo of their staycation, a simple marketing gift that promotes the hotel while utilizing a small lobby space for photo service.
                </p>
            </section>
            <section>
                <div className="img-container overflow-hidden mb-3">
                    <img
                        className="object-fit-cover h-100 w-100"
                        src="/images/thumbnails/benefit-revenue.webp"
                        alt="Revenue"
                    />
                </div>
                <h3 className={NunitoSans.className}>
                    Revenue
                </h3>
                <p className={NunitoSans.className}>
                    A new revenue stream will be memorable photo in a frame established as we become tenants, requiring only a small space in the lobby.
                </p>
            </section>
        </Animation>
    </section>
)