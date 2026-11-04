import { FC } from "react";
import { FeedbackFormProps } from "./props";
import { FeedbackFormProvider } from "./contexts/FeedbackFormContext";
import { MainForm } from "./components/MainForm";
import { Logo } from "@/components/brandings";

export const FeedbackForm : FC<FeedbackFormProps> = ({ number, code }) => {
    return (
        <FeedbackFormProvider
            code={code}
        >
            <MainForm 
                number={number}
                logo={(
                    <Logo
                        size={96}
                        className="mb-4 pb-2"
                    />
                )}
            />
        </FeedbackFormProvider>
    )
}