import { Logo } from "@/components/brandings";
import { LinkButton } from "@/components/buttons";
import { Facebook, Instagram, LinkedIn, XTwitter, Youtube } from "@/components/icons";
import Link from "next/link";

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
                At Lyfe Foto, we capture the moments that matter most.{' '}
                Our passion is turning your special memories into lasting visual treasures.{' '}
                Whether it{"'"}s a milestone celebration or everyday joy, we’re here to help you record your story.{' '}
                Record Your Memory With Us.
            </p>
            <div className="d-grid pb-3 mb-3">
                <LinkButton href="/book" pill>
                    Book an Appointment
                </LinkButton>
            </div>
            <div className="d-flex gap-3 justify-content-center align-items-center">
                <Link
                    href="https://www.facebook.com/lyfefoto/"
                    className="social-icons rounded-circle"
                >
                    <Facebook/>
                </Link>
                {/* <Link
                    href="#"
                    className="social-icons rounded-circle"
                >
                    <XTwitter
                        width={18}
                    />
                </Link> */}
                <Link
                    href="https://www.instagram.com/lyfe.foto"
                    className="social-icons rounded-circle"
                >
                    <Instagram/>
                </Link>
                {/* <Link
                    href="#"
                    className="social-icons rounded-circle"
                >
                    <Youtube
                        width={18}
                    />
                </Link> */}
                {/* <Link
                    href="#"
                    className="social-icons rounded-circle"
                >
                    <LinkedIn
                        width={18}
                    />
                </Link> */}
            </div>
        </section>
    )
}
