import { FC } from "react";

export const BackdropPanel : FC = () => (
    <section className="backdrop-panel position-sticky top-0">
        <div className="img-wrapper">
            <img 
                srcSet="/images/background-1280.webp 900w, /images/background-1600.webp 1280w, /images/background.webp 1600w"
                src="/images/background.webp"
                alt="Backdrop"
            />
        </div>
    </section>
)
