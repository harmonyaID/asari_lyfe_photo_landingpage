'use client'

import { FC, useEffect } from "react";
import { Props } from "./props";
import { useEventLandingContext } from "@/event-booking/contexts/EventLandingContext";

export const HeadlineSetter : FC<Props> = ({
    imgUrl
}) => {
    const { img, setImg } = useEventLandingContext()

    useEffect(() => {
        if (img == imgUrl) {
            return
        }

        setImg(imgUrl)
    }, [imgUrl])

    return (<></>)
}