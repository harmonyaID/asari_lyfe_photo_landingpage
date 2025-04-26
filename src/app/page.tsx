import { MainHeadline } from "@/components/brandings";
import { Navbar } from "@/components/navigations/navbar";
import { HotelBenefitSection, IntroSection, SubjectSection, TestimonySection } from "@/landing/components";
import { LandingProvider } from "./providers";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
    return (
        <LandingProvider>
            <Navbar/>
            <MainHeadline/>
            <IntroSection/>
            <SubjectSection/>
            <HotelBenefitSection/>
            <TestimonySection/>
        </LandingProvider>
    )
}
