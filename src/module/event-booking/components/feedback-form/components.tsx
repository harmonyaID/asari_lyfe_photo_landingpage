import { FC } from "react";
import { FeedbackFormProps } from "./props";
import { FeedbackFormProvider } from "./contexts/FeedbackFormContext";
import { MainForm } from "./components/MainForm";

export const FeedbackForm : FC<FeedbackFormProps> = ({ number, code }) => {
    return (
        <FeedbackFormProvider
            code={code}
        >
            <MainForm number={number}/>
        </FeedbackFormProvider>
    )
}