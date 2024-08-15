import { Response } from "@/types/responses";
import { Booking, CreateBookingFormdata } from "../types";
import { CreateBooking } from "../urls";
import { notifyError } from "@/helpers/notifications";

export const createBooking = async (formData : CreateBookingFormdata) : Promise<Response<Booking> | null> => {
    try {
        const response = await fetch(CreateBooking, {
            body: JSON.stringify(formData),
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const result : Response<Booking> = await response.json()

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