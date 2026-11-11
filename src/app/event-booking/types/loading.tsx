import { Loader } from "@/components/misc";
import { NunitoSans } from "@/configs/fonts";
import { EventTypeIntro } from "@/event-booking/components/event-type-intro";

export default function EventBookingTypesLoading() {
    return (
        <>
            <section 
                className={`${
                    "landing-container intro-section"
                } ${
                    NunitoSans.className
                }`}
            >
                <EventTypeIntro/>
                <div className="d-flex flex-column align-items-center w-100">
                    <Loader/>
                </div>
            </section>
        </>
    )
}