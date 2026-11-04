import { FC } from "react";
import { BookingFormProps } from "./props";
import { BookingFormProvider } from "./contexts/BookingFormContext";
import { MainForm } from "./components/MainForm";
import { Logo } from "@/components/brandings";

export const BookingForm : FC<BookingFormProps> = ({ location }) => {
    return (
        <BookingFormProvider
            location={location}
        >
            <MainForm
                logo={(
                    <Logo
                        size={96}
                        className="mb-4 pb-2"
                    />
                )}
            />
        </BookingFormProvider>
    )
}
