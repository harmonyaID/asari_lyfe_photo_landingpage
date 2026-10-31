'use client';

import { Animation } from "@/components/animation";
import { Button, LinkButton } from "@/components/buttons";
import { NotoSans, VarelaRound } from "@/configs/fonts";
import { useEventLandingContext } from "@/event-booking/contexts/EventLandingContext";
import { FC, useCallback, useEffect, useRef, useState } from "react";

export const EventHeadline: FC = () => {

    const { 
        folded, setFolded,
        img,
    } = useEventLandingContext()
    
    const [newImg, setNewImg] = useState('')
    const sectionRef = useRef<HTMLElement>(null)

    const handleFold = useCallback(() => {
        setFolded(true)
    }, [])

    useEffect(() => {
        if (!sectionRef.current) {
            return
        }

        const section = sectionRef.current
        section.classList.add('hidden')

        let timeout = setTimeout(() => {
            setNewImg(img)
            section.classList.remove('hidden')
        }, 300)

        return () => {
            section.classList.remove('hidden')
            clearTimeout(timeout)
        }
    }, [img])

    return (
        <section
            ref={sectionRef}
            className={`${
                "main-headline radius-reverse position-relative overflow-hidden"
            } ${
                folded ? 'wrapped' : 'full-screen'
            }`}
        >
            <img
                className="position-absolute top-0 start-0 end-0 bottom-0"
                srcSet={ !newImg ? "/images/events/headline-1280.webp 900w, /images/events/headline-1600.webp 1280w, /images/events/headline.webp 1600w" : undefined  }
                src={newImg || "/images/events/headline.webp"}
                alt="Backdrop"
            />
            <div className="landing-container h-100 position-relative">
                <div className="headline-text h-100 d-flex flex-column justify-content-center align-items-start">
                    { !folded ? (
                        <>
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
                                    Memorable<br/>Event Imaging
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
                                    Lyfe Foto is Memorable Imaging provider to your events.
                                </p>
                            </Animation>
                            <Animation
                                animation="fade-in"
                                delay={1500}
                                show
                            >
                                <LinkButton
                                    href="/event-booking/types"
                                    onClick={handleFold}
                                    scroll={false}
                                >
                                    Show Packages
                                </LinkButton>
                            </Animation>
                        </>
                    ) : (<></>) }
                </div>
            </div>
        </section>
    )
}