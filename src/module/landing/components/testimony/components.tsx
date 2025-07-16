import { FC } from "react";
import { TestimonyProps } from "./props";
import { QuoteIcon } from "@/components/icons";
import { NunitoSans } from "@/configs/fonts";
import { Rating } from "../rating";

export const Testimony : FC<TestimonyProps> = ({
    name,
    stars,
    message,
    image = ''
}) => (
    <section
        className="testimony rounded-3 h-100"
    >
        <QuoteIcon/>
        <p className={NunitoSans.className}>
            { message }
        </p>
        <div className="customer gap-2">
            <div className="picture">
                <img
                    className="object-fit-cover w-100 h-100"
                    src={ image ? image : `https://ui-avatars.com/api/?name=${name}&rounded=true&color=FFFFFF&background=0099AB&font-size=0.35` }
                    alt={`${name}'s picture`}
                />
            </div>
            <div>
                <div className="fw-semibold">
                    { name }
                </div>
                <Rating
                    value={stars}
                    size="1.5rem"
                />
            </div>
        </div>
    </section>
)