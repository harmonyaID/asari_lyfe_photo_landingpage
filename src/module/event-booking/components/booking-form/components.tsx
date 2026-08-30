'use client'

import { FC, useContext, useEffect } from "react";
import { BookingFormProps } from "./props";
import { BookingFormProvider } from "./contexts/BookingFormContext";
import { BackdropContext, BackdropContextType } from "@/book/contexts/BackdropContext";
import { MainForm } from "./components/MainForm";

export const BookingForm : FC<BookingFormProps> = ({ eventPackage }) => {
    const { setImg } = useContext(BackdropContext) as BackdropContextType

    useEffect(() => {
        setImg(eventPackage.eventType.thumbnail)
    }, [eventPackage])

    return (
        <BookingFormProvider
            eventPackage={eventPackage}
        >
            <MainForm/>
        </BookingFormProvider>
    )
}