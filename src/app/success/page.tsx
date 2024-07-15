import { LinkButton } from "@/components/buttons";
import { SuccessIcon } from "@/components/icons";
import { FC } from "react";

const SuccessPage : FC = () => (
    <section>
        <div className="pb-3 mb-5">
            <SuccessIcon/>
        </div>
        <h1 className="pb-2 mb-1 page-title bold">
            BOOKING SUccess
        </h1>
        <p className="fw-light pb-5 mb-1">
            Successfully bookedd an appointment, our team will reach you as soon as possible
        </p>
        <div className="d-grid">
            <LinkButton href="/" pill>
                Back to Home
            </LinkButton>
        </div>
    </section>
)

export default SuccessPage