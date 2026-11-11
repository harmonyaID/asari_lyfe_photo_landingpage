import { LinkButton } from "@/components/buttons";
import { ErrorIcon } from "@/components/icons";
import { FC } from "react";

const NotFound : FC = () => (
    <section className="vw-100 vh-100 pt-5">
        <main className="container pt-5">
            <div className="pt-lg-5">
                <ErrorIcon
                    className="mb-5"
                />
                <h1 className="pb-2 mb-1 page-title bold">
                    404 PAGE NOT FOUND
                </h1>
                <p className="fw-light pb-5 mb-1">
                    We{"'"}re sorry, the page you are looking for does not exist in our database!
                </p>
                <LinkButton href="/" pill>
                    Back to Home
                </LinkButton>
            </div>
        </main>
    </section>
)

export default NotFound