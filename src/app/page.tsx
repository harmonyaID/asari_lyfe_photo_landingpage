import { MainHeadline } from "@/components/brandings";
import { Navbar } from "@/components/navigations/navbar";
import { BookBtn, Footer, GallerySection, HotelBenefitSection, IntroSection, PartnerSection, SubjectSection, TestimonySection } from "@/landing/components";
import { LandingProvider } from "./providers";
import "swiper/css";
import "swiper/css/pagination";
import { Section } from "@/components/layouts/section";

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
