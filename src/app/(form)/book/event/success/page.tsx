import { LinkButton } from "@/components/buttons";
import { SuccessIcon } from "@/components/icons";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: `Order Success | ${ process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto' }`
}

const SuccessPage : FC = () => (
    <section>
        <div className="pb-3 mb-5">
            <SuccessIcon/>
        </div>
        <h1 className="pb-2 mb-1 page-title bold">
            ORDER SUCCESS
        </h1>
        <p className="fw-light mb-1">
            Successfully ordered, our team will reach you as soon as possible
        </p>
        <div className="d-grid">
            <LinkButton href="/" pill>
                Back to Home
            </LinkButton>
        </div>
    </section>
)

export default SuccessPage