import { Navbar } from "@/components/navigations/navbar";
import { BookBtn, Footer, GallerySection, HotelBenefitSection, IntroSection, PartnerSection, SubjectSection, TestimonySection } from "@/landing/components";
import { LandingProvider } from "../providers";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Section } from "@/components/layouts/section";
import { Metadata } from "next";
import { EventHeadline } from "@/module/event-booking/components/EventHeadline";
import { EventTypes } from "@/module/event-booking/components/EventTypes";

export const metadata: Metadata = {
    title: `Memorable Family Staycation Imaging Provider | ${ process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto' }`,
}

export default function Home() {
    return (
        <LandingProvider>
            <Navbar/>
            <EventHeadline/>
            <Section
                id="intro"
                observable
                ratio={.2}
            >
                <EventTypes/>
            </Section>
            <Footer/>
            <BookBtn/>
        </LandingProvider>
    )
}
