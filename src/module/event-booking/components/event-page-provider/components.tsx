'use client'

import { useEventLandingContext } from "@/event-booking/contexts/EventLandingContext";
import { FC, useEffect } from "react";

export const EventPageProvider : FC = () => {

    const { setFolded } = useEventLandingContext()

    useEffect(() => {
        setFolded(false)
    }, [])

    return (<></>)
}