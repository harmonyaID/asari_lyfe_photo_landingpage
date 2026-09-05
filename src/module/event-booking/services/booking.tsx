import { Response } from "@/types/responses";
import { CreateBookingFormdata } from "../types/booking";
import { CreateBooking } from "../urls/booking";
import { notifyError } from "@/helpers/notifications";

export const createBooking = async (formData : CreateBookingFormdata) : Promise<Response<null> | null> => {
    try {
        const response = await fetch(CreateBooking, {
            body: JSON.stringify(formData),
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Timezone": window.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            }
        })

        const result : Response<null> = await response.json()

        if (response.ok) {
            return {
                result: result.result,
                status: result.status
            }
        }

        const message = result.status.message
        const internalMsg = result.status.internalMsg

        notifyError(
            <>
                <p 
                    className={`${
                        internalMsg ? 'mb-1' : 'mb-0'
                    }`}
                >
                    { message }
                </p>
                { internalMsg ? (
                    <p className="mb-0">
                        { internalMsg }
                    </p>
                ) : (<></>) }
            </>
        )

        return result
    
    } catch (error) {
        notifyError("Server error")
        return null
    }
}