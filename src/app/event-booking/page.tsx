import { Navbar } from "@/components/navigations/navbar";
import { Footer } from "@/landing/components";
import { LandingProvider } from "../providers";
import { Metadata } from "next";
import { EventHeadline } from "@/event-booking/components/event-headline";
import { EventTypes } from "@/event-booking/components/event-types";

export const metadata: Metadata = {
    title: `Memorable Event Imaging Provider | ${ process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto' }`,
}

export default function Home() {
    return (
        <LandingProvider>
            <Navbar hideBookButton/>
            <EventHeadline/>
            <EventTypes/>
            <Footer/>
        </LandingProvider>
    )
}
