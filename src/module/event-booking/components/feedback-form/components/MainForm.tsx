'use client'

import { FC, useContext } from "react"
import { FeedbackFormContext, FeedbackFormContextType } from "../contexts/FeedbackFormContext"
import Link from "next/link"
import { Logo } from "@/components/brandings"
import { ExperienceForm } from "./ExperienceForm"
import { ProductPriceForm } from "./ProductPriceForm"
import { LoyalityForm } from "./LoyalityForm"

interface Props {
    number: string
}

export const MainForm : FC<Props> = ({ number }) => {
    const {
        phase
    } = useContext(FeedbackFormContext) as FeedbackFormContextType

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
                <h1 className="fw-light mb-4 page-title">
                    Feedback Form for booking <span className="fw-semibold">#{ number }</span>
                </h1>
            </div>

            { phase == 'experience' ? (
                <ExperienceForm/>
            ) : phase == 'product & price' ? (
                <ProductPriceForm/>
            ) : (
                <LoyalityForm number={number}/>
            ) }
        </section>
    )
}