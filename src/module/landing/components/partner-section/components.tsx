'use client';

import { Animation } from "@/components/animation";
import { LinkButton } from "@/components/buttons";
import { Section } from "@/components/layouts/section";
import { VarelaRound } from "@/configs/fonts";
import { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Partners } from "./constants";

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
        <section className="partner-list landing-container d-flex flex-wrap justify-content-between">
            <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                    576: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: Math.min(5, Partners.length) },
                }}
                pagination={{ clickable:true }}
            >
                { Partners.map((partner) => (
                    <SwiperSlide
                        key={`partner-${partner.id}`}
                    >
                        <Animation
                            animation="slide-to-bottom"
                            className="text-center"
                        >
                            <img
                                src={ partner.url }
                                alt={ partner.name }
                                title={ partner.name }
                                height={120}
                                width="auto"
                            />
                        </Animation>
                    </SwiperSlide>
                )) }
            </Swiper>
        </section>
        <section className="landing-container">
            <Animation
                animation="fade-in"
            >
                <div
                    className={`${
                        VarelaRound.className
                    } ${
                        "bg-dark text-white d-flex flex-wrap align-items-center justify-content-between book position-relative gap-3 overflow-hidden"
                    }`}
                >
                    <h3 className="mb-0">
                        Want memorable staycation photo service in your Hotel & Resort?
                    </h3>
                    <LinkButton
                        href="/book"
                        target="_blank"
                    >
                        Book Appointment Now
                    </LinkButton>
                    <img
                        src="/images/misc/ornament.svg"
                        className="ornament position-absolute"
                    />
                </div>
            </Animation>
        </section>
    </Section>
)