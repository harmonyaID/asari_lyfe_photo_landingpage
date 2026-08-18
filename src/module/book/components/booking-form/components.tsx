import { FC } from "react";
import { BookingFormProps } from "./props";
import { BookingFormProvider } from "./contexts/BookingFormContext";
import { MainForm } from "./components/MainForm";

export const BookingForm : FC<BookingFormProps> = ({ location }) => {
    return (
        <BookingFormProvider
            location={location}
        >
            <MainForm/>
        </BookingFormProvider>
    )
}
