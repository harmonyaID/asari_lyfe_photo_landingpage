import { Animation } from "@/components/animation";
import { Thumbnail } from "@/components/layouts/thumbnail";
import { NunitoSans, VarelaRound } from "@/configs/fonts";
import { FC } from "react";

export const IntroSection : FC = () => (
    <section 
        className={`${
            "landing-container intro-section"
        } ${
            NunitoSans.className
        }`}
    >
        <div className="d-flex flex-column intro-flex align-items-stretch w-100">
            <div className="d-grid grid-cols-lg-5 justify-content-stretch intro">
                <Animation 
                    animation="slide-to-right"
                    wrapperClassName="grid-span-lg-3"
                >
                    <h2 className={VarelaRound.className}>
                        Who We Are
                    </h2>
                    <hr />
                    <p className="fw-medium">
                        <span className="fw-semibold">
                            Lyfe Foto
                        </span>
                        {' '}is in the business of capturing leisure vacation memories. We deliver innovative photography solutions and first-class service to our hotel partners.
                    </p>
                    <p>
                        We provide free photo sessions within the hotel area only, for a limited number of families staying at the hotel. This photo session includes one free printed photo with an A5 frame. Each photo will be taken by our professional photographer using a full-frame camera and professional lighting.
                    </p>
                    <p>
                        Our Mission is To provide unforgettable photographic memories for families, children, and couples during their staycations, enhancing their hotel experience with professional photography and beautiful scenery
                    </p>
                </Animation>
                <Animation 
                    animation="slide-to-left"
                    wrapperClassName="grid-span-lg-2"
                >
                    <Thumbnail
                        src="/images/thumbnails/intro.webp"
                        alt="Introduction thumbnail"
                    />
                </Animation>
            </div>
            <div className="d-grid grid-cols-lg-5 justify-content-stretch intro">
                <Animation 
                    animation="slide-to-right"
                    wrapperClassName="grid-span-lg-2"
                >
                    <Thumbnail
                        src="/images/thumbnails/value.webp"
                        alt="Value thumbnail"
                    />
                </Animation>
                <Animation 
                    animation="slide-to-left"
                    wrapperClassName="grid-span-lg-3"
                    className="text-end"
                >
                    <h2 className={VarelaRound.className}>
                        What Value We Offer?
                    </h2>
                    <hr />
                    <p className="fw-semibold mb-0">
                        Free Photo Session
                    </p>
                    <p>
                        By giving free photo session activity for guest who stay,<br/>
                        instantly increase the value of staycation in hotel
                    </p>
                    <p className="fw-semibold mb-0">
                        Memorable gift
                    </p>
                    <p>
                        Souvernir that constanly remind every guest about<br/>
                        their memorable staycation in hotel
                    </p>
                </Animation>
            </div>
            <div className="d-grid grid-cols-lg-5 intro">
                <Animation 
                    animation="slide-to-right"
                    wrapperClassName="grid-span-lg-3"
                >
                    <h2 className={VarelaRound.className}>
                        How It Works?
                    </h2>
                    <hr />
                    <p className="fw-semibold mb-0">
                        Free Voucher
                    </p>
                    <p>
                        A FREE voucher will be provided by the receptionist to every guest upon check-in, and guests typically book their photo session at our counter afterward.
                    </p>
                    <p className="fw-semibold mb-0">
                        Photo Session
                    </p>
                    <p>
                        Guests participate in the photo session as scheduled, for a maximum of 30 minutes in the hotel area with our photographer.
                    </p>
                    <p className="fw-semibold mb-0">
                        Review
                    </p>
                    <p>
                    Guests can choose their favorite photo for a complimentary staycation gift in a frame and have the option to purchase digital files, larger prints, photobooks, etc., if they wish.
                    </p>
                </Animation>
                <Animation 
                    animation="slide-to-left"
                    wrapperClassName="grid-span-lg-2"
                >
                    <Thumbnail
                        src="/images/thumbnails/procedure.webp"
                        alt="Procedure thumbnail"
                    />
                </Animation>
            </div>
        </div>
    </section>
)