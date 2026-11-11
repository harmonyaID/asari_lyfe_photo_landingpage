import { LinkButton } from "@/components/buttons";
import { SuccessIcon } from "@/components/icons";
import { getAppName } from "@/helpers/app/functions";
import { getAppSettings } from "@/setting/services/app-setting";
import { Metadata } from "next";
import { FC } from "react";


export async function generateMetadata() : Promise<Metadata> {
    
    const appName = await getAppName()
    
    return {
        title: `Order Success | ${ appName }`
    }
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