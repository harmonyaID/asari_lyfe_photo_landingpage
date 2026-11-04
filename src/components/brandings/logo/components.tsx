import { FC, Suspense } from "react";
import { LogoProps } from "./props";
import { AsyncLogo } from "../async-logo";
import { Image } from "react-feather";

export const Logo : FC<LogoProps> = ({
    size = 96,
    className = ''
}) => {
    return (
        <Suspense
            fallback={
                <Image 
                    size={size} 
                    className={className}
                />
            }
        >
            <AsyncLogo
                size={size}
                className={className}
            />
        </Suspense>
    )
}