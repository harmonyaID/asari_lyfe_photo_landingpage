'use client'

import { FC, useContext } from "react"
import { BookingFormContext, BookingFormContextType } from "../contexts/BookingFormContext"
import { LocationForm } from "./LocationForm"
import { PersonalDataForm } from "./PersonalDataForm"
import { Logo } from "@/components/brandings"
import Link from "next/link"

export const MainForm : FC = () => {
    const { 
        phase
    } = useContext(BookingFormContext) as BookingFormContextType

    return (
        <section className="text-start">
            <div 
                className={`${
                    "content-header position-lg-sticky top-0 bg-white z-1"
                }`}
            >
                <Link href="/">
                    <Logo
                        size={96}
                        className="mb-4 pb-2"
                    />
                </Link>
                <h1 className="fw-light mb-3 page-title">
                    Record Your Memory <span className="fw-semibold">With Us</span>
                </h1>
            </div>

            { phase == 'location' ? (
                <LocationForm/>
            ) : (
                <PersonalDataForm/>
            ) }
        </section>
    )
}