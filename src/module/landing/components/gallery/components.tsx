'use client'

import { Animation } from "@/components/animation";
import { useMediaQuery } from "@/hooks/media-query";
import { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GalleryAmount } from "./constants";

export const Gallery : FC = () => {
    const isMd = useMediaQuery("(min-width: 768px)");

    if (isMd) {
        return (
            <section
                className="landing-container d-grid grid-cols-11 gap-3"
            >
                { Array(GalleryAmount).fill(0).map((item, index) => (
                    <Animation
                        animation="fade-in"
                        delay={((index % 5) + 1) * 100}
                        key={`gallery-item-${index}`}
                        wrapperClassName={`${
                            index % 10 == 0 || index % 10 == 7 ? 'grid-span-5 grid-row-span-2' :
                            'grid-span-3'
                        }`}
                        className={`${
                            "item position-relative rounded-3 overflow-hidden"
                        } ${
                            index % 10 != 0 && index % 10 != 7 ? 'singular' : 'h-100'
                        }`}
                    >
                        <img 
                            src={`/images/gallery/gallery-${(index + 1).toString().padStart(2, '0')}.webp`}
                            alt={`Gallery item #${index + 1}`}
                            className="object-fit-cover h-100 w-100"
                        />
                    </Animation>
                )) }
            </section>
        )
    }

    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable:true }}
        >
            { Array(GalleryAmount).fill(0).map((item, index) => (
                <SwiperSlide
                    key={`gallery-item-${index}`}
                >
                    <Animation
                        animation="fade-in"
                        className={`${
                            "small-item position-relative rounded-3 overflow-hidden"
                        }`}
                    >
                        <img 
                            src={`/images/gallery/gallery-${(index + 1).toString().padStart(2, '0')}.webp`}
                            alt={`Gallery item #${index + 1}`}
                            className="object-fit-cover h-100 w-100"
                        />
                    </Animation>
                </SwiperSlide>
            )) }
        </Swiper>
    )
}