import { FC } from "react";
import { NavbarItem, NavItem } from "../navbar-item";
import Link from "next/link";
import { Logo } from "@/components/brandings";
import { LinkButton } from "@/components/buttons";

const items : NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'intro', label: 'About Us' },
    { id: 'portfolio', label: 'Our Works' },
    { id: 'partner', label: 'Our Partners' },
    { id: 'contact', label: 'Contact Us' },
]

export const Navbar : FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="landing-container">
                <Link
                    className="navbar-brand"
                    href={"#"}
                >
                    <Logo
                        size={64}
                    />
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#main-nav" 
                    aria-controls="main-nav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div 
                    className="collapse navbar-collapse align-items-lg-center justify-content-lg-end"
                    id="main-nav"
                >
                    <div className="navbar-nav align-items-lg-center gap-4">
                        { items.map(item => (
                            <NavbarItem
                                key={item.id}
                                label={item.label}
                                id={item.id}
                            />
                        )) }
                        <LinkButton
                            href="/book"
                            className="fs-7"
                        >
                            Book Appointment Now
                        </LinkButton>
                    </div>
                </div>
            </div>
        </nav>
    )
}