import { Loader } from "@/components/misc";
import { NunitoSans } from "@/configs/fonts";

export default function EventBookingPackagesLoading() {
    return (
        <>
            <section 
                className={`${
                    "landing-container intro-section"
                } ${
                    NunitoSans.className
                }`}
            >
                <p className="mb-5 pb-5 mb-2 text-center">
                    Loading Packages...
                </p>
                <div className="d-flex flex-column align-items-center w-100">
                    <Loader/>
                </div>
            </section>
        </>
    )
}