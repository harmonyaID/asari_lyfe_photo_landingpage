import { MainHeadline } from "@/components/brandings";
import { Navbar } from "@/components/navigations/navbar";
import { BookBtn, Footer, GallerySection, HotelBenefitSection, IntroSection, PartnerSection, SubjectSection, TestimonySection } from "@/landing/components";
import { LandingProvider } from "./providers";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Section } from "@/components/layouts/section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Memorable Family Staycation Imaging Provider | ${ process.env.NEXT_PUBLIC_APP_NAME }`,
}

export default function Home() {
    return (
        <LandingProvider>
            <Navbar/>
            <MainHeadline/>
            <Section
                id="intro"
                observable
                ratio={.2}
            >
                <IntroSection/>
                <SubjectSection/>
                <HotelBenefitSection/>
                <TestimonySection/>
            </Section>
            <GallerySection/>
            <PartnerSection/>
            <Footer/>
            <BookBtn/>
        </LandingProvider>
    )
}
