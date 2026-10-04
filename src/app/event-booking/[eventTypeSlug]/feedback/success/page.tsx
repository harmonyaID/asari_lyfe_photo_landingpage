import { SuccessIcon } from "@/components/icons"
import { getAppName } from "@/helpers/app/functions"
import { Metadata } from "next"

interface Props {
    params : Promise<{number: string}>
}

export async function generateMetadata({ params }: Props) : Promise<Metadata> {
    const { number } = await params

    const appName = getAppName()

    let title       = `Event ${number} Feedback Submitted`
    let description = `Feedback for event #${number} successfully submitted`

    return {
        title       : `${title} | ${appName}`,
        description : description
    }
}

const SuccessPage = async () => {
    return (
        <section>
            <div className="pb-3 mb-5">
                <SuccessIcon/>
            </div>
            <h1 className="pb-2 mb-1 page-title bold">
                FEEDBACK SUBMITTED
            </h1>
            <p className="fw-light mb-1">
                Thank you for your feedback.
            </p>
        </section>
    )
}

export default SuccessPage