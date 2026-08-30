'use client'

import { BackdropContext, BackdropContextType } from "@/book/contexts/BackdropContext";
import { FC, useContext } from "react";

export const BackdropPanel : FC = () => {
    const { img } = useContext(BackdropContext) as BackdropContextType
    
    return (
        <section className="backdrop-panel position-sticky top-0">
            <div className="img-wrapper">
                <img 
                    srcSet={ !img ? "/images/background-1280.webp 900w, /images/background-1600.webp 1280w, /images/background.webp 1600w" : undefined }
                    src={ img || "/images/background.webp" }
                    alt="Backdrop"
                />
            </div>
        </section>
    )
}