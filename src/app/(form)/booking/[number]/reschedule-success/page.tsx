import { SuccessIcon } from "@/components/icons";
import { Metadata } from "next";

interface Props {
    params      : Promise<{number: string}>
    searchParams: Promise<{ code: string } | Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { number }= await params

    let title       = `Appointment #${number} Rescheduled`
    let description = `Appointment #${number} successfully rescheduled`

    return {
        title       : `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description : description
    }
}


const CancelSuccessPage = async ({ params, searchParams }: Props) => {
    const { number }    = await params

    return (
        <section>
            <div className="pb-3 mb-5">
                <SuccessIcon/>
            </div>
            <h1 className="pb-2 mb-1 page-title bold">
                APPOINTMENT {number} RESCHEDULED
            </h1>
            <p className="fw-light mb-1">
                Your appointment successfully rescheduled, our team will reach you as soon as possible
            </p>
        </section>
    )
}

export default CancelSuccessPage
