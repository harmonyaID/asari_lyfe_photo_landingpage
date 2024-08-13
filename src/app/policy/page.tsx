import { BackButton } from "@/components/buttons";
import { PolicySection } from "@/support/components/policy-section";
import { FC } from "react";

const PolicyPage : FC = () => (
    <section className="text-start">
        <BackButton
            className="pb-1 mb-5"
        />

        <h1 className="mb-4 page-title fw-semibold">
            Booking Policy
        </h1>
        <PolicySection/>
    </section>
)

export default PolicyPage