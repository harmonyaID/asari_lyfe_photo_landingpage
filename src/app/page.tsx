import { Logo, MainHeadline } from "@/components/brandings";
import { Navbar } from "@/components/navigations/navbar";
import { BookBtn, Footer, GallerySection, HotelBenefitSection, IntroSection, PartnerSection, SubjectSection, TestimonySection } from "@/landing/components";
import { LandingProvider } from "./providers";
import { Section } from "@/components/layouts/section";
import { Metadata } from "next";
import { getAppName } from "@/helpers/app/functions";

export async function generateMetadata() : Promise<Metadata> {

    const appName = await getAppName()

    return {
        title: `Memorable Family Staycation Imaging Provider | ${ appName }`,
    }
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
                {/* <TestimonySection/> */}
            </Section>
            <GallerySection/>
            <PartnerSection/>
            <Footer
                logo={(
                    <Logo
                        size={160}
                        className="mb-4"
                    />
                )}
            />
            <BookBtn/>
        </LandingProvider>
    )
}
