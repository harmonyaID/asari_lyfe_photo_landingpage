import { Navbar } from "@/components/navigations/navbar";
import { Footer } from "@/landing/components";
import { LandingProvider } from "../providers";
import { Metadata } from "next";
import { EventHeadline } from "@/event-booking/components/event-headline";
import { EventTypes } from "@/event-booking/components/event-types";
import { EventLandingProvider } from "@/event-booking/contexts/EventLandingContext";

export const metadata: Metadata = {
    title: `Memorable Event Imaging Provider | ${ process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto' }`,
}

export default function Home() {
    return (
        <LandingProvider>
            <EventLandingProvider>
                <Navbar hideBookButton/>
                <EventHeadline/>
                <EventTypes/>
                <Footer/>
            </EventLandingProvider>
        </LandingProvider>
    )
}
