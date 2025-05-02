'use client'

import { Logo } from "@/components/brandings"
import { PlainFacebook, PlainInstagram } from "@/components/icons"
import { Inter, NunitoSans, VarelaRound } from "@/configs/fonts"
import { NavbarContext } from "@/contexts/navbar-context"
import { NavbarContextType } from "@/contexts/navbar-context/types"
import { useGetLocation } from "@/location/hooks"
import Link from "next/link"
import { FC, useContext, useEffect, useRef } from "react"
import { Mail, MapPin, Phone } from "react-feather"

export const Footer : FC = () => {
    const elementRef = useRef<HTMLElement>(null)
    const { observe, unobserve } = useContext(NavbarContext) as NavbarContextType

    const { data, isLoading, error } = useGetLocation()

    useEffect(() => {
        if (!elementRef.current) {
            return
        }

        const element = elementRef.current

        observe(element)

        return () => {
            unobserve(element)
        }
    }, [observe, unobserve])

    return (
        <footer
            ref={elementRef}
            id="contact"
            data-id="contact"
            className="landing-footer landing-container"
        >
            <section
                className={`${
                    VarelaRound.className
                } ${
                    "d-flex gap-5 contact"
                }`}
            >
                <section 
                    className="flex-grow-0 flex-shrink-0"
                >
                    <Logo
                        size={160}
                        className="mb-4"
                    />
                    <div className="px-3">
                        <p className="mb-4">Follow Us On:</p>
                        <div className="d-flex flex-wrap gap-3">
                            <Link
                                href="https://www.instagram.com/lyfe.foto"
                                target="_blank"
                                className="text-dark"
                            >
                                <PlainInstagram
                                    width="1.5rem"
                                    height="1.5rem"
                                />
                            </Link>
                            <Link
                                href="https://www.facebook.com/lyfefoto/"
                                target="_blank"
                                className="text-dark"
                            >
                                <PlainFacebook
                                    width="1.5rem"
                                    height="1.5rem"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Contact Us</h2>
                    <div className="d-grid grid-cols-md-2 grid-cols-xxl-4 gap-5">
                        { isLoading ? (
                            <></>
                        ) : error || data?.status?.code != 200 ? (
                            <div className="grid-span-4 text-center">
                                Failed to fetch the data, please check your connection
                            </div>
                        ) : data.result?.map((item) => (
                            <section 
                                key={`item-${item.id}`}
                            >
                                <h3>{ item.name }</h3>
                                <div className="d-flex gap-2 align-items-start">
                                    <MapPin
                                        size="1.25rem"
                                        className="text-primary flex-shrink-0 flex-grow-0 pt-1"
                                    />
                                    <p className={NunitoSans.className}>
                                        { item.address }
                                    </p>
                                </div>
                                <div className="d-flex gap-2 align-items-start">
                                    <Phone
                                        size="1.25rem"
                                        className="text-primary flex-shrink-0 flex-grow-0 pt-1"
                                    />
                                    <p className={NunitoSans.className}>
                                        { item.phone }
                                    </p>
                                </div>
                                <div className="d-flex gap-2 align-items-start">
                                    <Mail
                                        size="1.25rem"
                                        className="text-primary flex-shrink-0 flex-grow-0 pt-1"
                                    />
                                    <p className={NunitoSans.className}>
                                        { item.email || '-' }
                                    </p>
                                </div>
                            </section>
                        )) }
                    </div>
                </section>
            </section>
            <hr className="normal" />
            <section
                className={`${
                    "copyright text-center text-dark"
                } ${
                    Inter.className
                }`}
            >
                <p>Copyright ©2024 - 2025 Lyfe Foto. All Rights Reserved. Design & Development By Harmonya Indonesia</p>
                <p>
                    This site is protected by reCAPTCHA and the Google{' '}
                    <Link target="_blank" href="https://policies.google.com/privacy">Privacy Policy</Link> 
                    {' '}and{' '}
                    <Link target="_blank" href="https://policies.google.com/terms">Terms of Service</Link> 
                    {' '}apply.
                </p>
            </section>
        </footer>
    )
}