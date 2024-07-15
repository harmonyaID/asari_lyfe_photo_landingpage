import { Logo } from "@/components/brandings";
import { LinkButton } from "@/components/buttons";

export default function Home() {
    return (
        <section>
            <Logo 
                size={120}
                className="mb-4 pb-2"
            />
            <h1 className="fw-light mb-2 page-title">
                Record Your Memory <span className="fw-semibold">With Us</span>
            </h1>
            <p className="pb-1 mb-5">
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                used to demonstrate the visual form of a document or a typeface without 
                relying on meaningful content. Lorem ipsum 
            </p>
            <div className="d-grid">
                <LinkButton href="#" pill>
                    Book an Appointment
                </LinkButton>
            </div>
        </section>
    )
}
