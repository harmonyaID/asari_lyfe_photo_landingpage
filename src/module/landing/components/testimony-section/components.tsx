'use client'

import { Animation } from "@/components/animation";
import { VarelaRound } from "@/configs/fonts";
import { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DummyTestimony } from "./constants";
import { Testimony } from "../testimony/components";

export const TestimonySection : FC = () => (
    <section className="testimony-section">
        <header className="text-center">
            <Animation
                animation="slide-to-up"
            >
                <h2 className={VarelaRound.className}>
                    What They Say?
                </h2>
            </Animation>
            <hr />
        </header>
        <section className="landing-container">
            <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                    576: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                }}
                className="summary-swiper w-100"
            >
                { DummyTestimony.map((item, index) => (
                    <SwiperSlide
                        key={`testimony-${index}`}
                    >
                        <Animation
                            animation="slide-to-bottom"
                            delay={index * 100}
                        >
                            <Testimony
                                name={item.name}
                                message={item.message}
                                stars={item.stars}
                                image={item.image}
                            />
                        </Animation>
                    </SwiperSlide>
                )) }
            </Swiper>
        </section>
    </section>
)