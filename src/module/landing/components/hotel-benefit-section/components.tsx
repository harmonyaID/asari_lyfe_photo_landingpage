'use client'

import { Animation } from "@/components/animation";
import { NunitoSans, VarelaRound } from "@/configs/fonts";
import { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
            className="landing-container"
        >
            <Swiper
                modules={[Pagination]}
                spaceBetween={64}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                }}
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                }}
                className="summary-swiper w-100"
            >
                <SwiperSlide>
                    <section>
                        <div className="img-container overflow-hidden mb-3">
                            <img
                                className="object-fit-cover h-100 w-100"
                                src="/images/thumbnails/benefit-engaging.webp"
                                alt="Engaging Activity"
                            />
                        </div>
                        <h3 
                            className={`${
                                "mb-3"
                            } ${
                                NunitoSans.className
                            }`}
                        >
                            Engaging Activity
                        </h3>
                        <p className={NunitoSans.className}>
                            Every guest can enjoy an engaging and fun photo session with their family for free, adding more value to their staycation at the hotel.
                        </p>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section>
                        <div className="img-container overflow-hidden mb-3">
                            <img
                                className="object-fit-cover h-100 w-100"
                                src="/images/thumbnails/benefit-gift.webp"
                                alt="Memorable Gift"
                            />
                        </div>
                        <h3 
                            className={`${
                                "mb-3"
                            } ${
                                NunitoSans.className
                            }`}
                        >
                            Memorable Gift
                        </h3>
                        <p className={NunitoSans.className}>
                            Guests will receive a free framed photo of their staycation, a simple marketing gift that promotes the hotel while utilizing a small lobby space for photo service.
                        </p>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section>
                        <div className="img-container overflow-hidden mb-3">
                            <img
                                className="object-fit-cover h-100 w-100"
                                src="/images/thumbnails/benefit-revenue.webp"
                                alt="Revenue"
                            />
                        </div>
                        <h3 
                            className={`${
                                "mb-3"
                            } ${
                                NunitoSans.className
                            }`}
                        >
                            Revenue
                        </h3>
                        <p className={NunitoSans.className}>
                            A new revenue stream will be memorable photo in a frame established as we become tenants, requiring only a small space in the lobby.
                        </p>
                    </section>
                </SwiperSlide>
            </Swiper>
        </Animation>
    </section>
)