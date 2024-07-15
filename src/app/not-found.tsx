import { LinkButton } from "@/components/buttons";
import { ErrorIcon } from "@/components/icons";
import { FC } from "react";

const NotFound : FC = () => (
    <section>
        <div className="pb-3 mb-5">
            <ErrorIcon/>
        </div>
        <h1 className="pb-2 mb-1 page-title bold">
            404 PAGE NOT FOUND
        </h1>
        <p className="fw-light pb-5 mb-1">
            We{"'"}re sorry, the page you are looking for does not exist in our database!
        </p>
        <div className="d-grid">
            <LinkButton href="/" pill>
                Back to Home
            </LinkButton>
        </div>
    </section>
)

export default NotFound