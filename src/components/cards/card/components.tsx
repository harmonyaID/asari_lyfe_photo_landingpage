import { FC } from "react";
import { CardProps } from "./props";

export const Card : FC<CardProps> = ({
    imgUrl,
    className,
    children,
}) => (
    <section 
        className={`${
            "card"
        } ${
            className || ''
        }`}
    >
        { imgUrl ? (
            <div className="card-img">
                <img 
                    src={imgUrl} 
                    alt="Card image"
                    className="card-img-top"
                />
            </div>
        ) : (<></>) }
        <div className="card-body">
            { children }
        </div>
    </section>
)