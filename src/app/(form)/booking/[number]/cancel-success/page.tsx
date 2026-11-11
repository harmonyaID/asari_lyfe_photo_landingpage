import { SuccessIcon } from "@/components/icons";
import { getAppName } from "@/helpers/app/functions";
import { getAppSettings } from "@/setting/services/app-setting";
import { Metadata } from "next";

interface Props {
    params      : Promise<{number: string}>
    searchParams: Promise<{ code: string } | Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props) : Promise<Metadata> {
    const { number }= await params

    let title       = `Appointment #${number} Cancelled`
    let description = `Appointment #${number} successfully cancelled`

    const appName = await getAppName()

    return {
        title       : `${title} | ${appName}`,
        description : description
    }
}


const BookingPage = async ({ params, searchParams }: Props) => {
    const { number }    = await params

    return (
        <section>
            <div className="pb-3 mb-5">
                <SuccessIcon/>
            </div>
            <h1 className="pb-2 mb-1 page-title bold">
                APPOINTMENT {number} CANCELLED
            </h1>
            <p className="fw-light mb-1">
                Sad to see you go, please don{"'"}t hesitate to {' '}
                contact us whenever you need our service.
            </p>
        </section>
    )
}

export default BookingPage
