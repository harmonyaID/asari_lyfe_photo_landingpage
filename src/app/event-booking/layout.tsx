import { PropsWithChildren } from "react";
import { LandingProvider } from "../providers";
import { EventLandingProvider } from "@/event-booking/contexts/EventLandingContext";
import { Navbar } from "@/components/navigations/navbar";
import { Footer } from "@/landing/components";
import { EventHeadline } from "@/event-booking/components/event-headline";
import { Logo } from "@/components/brandings";

export default function EventBookingLayout({
    children
}: Readonly<PropsWithChildren>) {
    return (
        <LandingProvider>
            <EventLandingProvider>
                <Navbar hideBookButton/>
                <EventHeadline/>
                { children }
                <Footer
                    logo={(
                        <Logo
                            size={160}
                            className="mb-4"
                        />
                    )}
                />
            </EventLandingProvider>
        </LandingProvider>
    )
}