import { Response } from "@/types/responses";
import { Booking, CreateBookingFormdata } from "../types";
import { CreateBooking } from "../urls";
import { notifyError } from "@/helpers/notifications";
import { CancelBookingFormdata, DeleteBookingAdjustmentFormdata, RescheduleBookingFormdata } from "../types/booking";
import { CancelBooking, DeleteBookingAdjustment, RescheduleBooking } from "../urls/booking";

export const createBooking = async (formData : CreateBookingFormdata) : Promise<Response<Booking> | null> => {
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

export const cancelBooking = async (number: string, formData: CancelBookingFormdata) : Promise<Response<null>|null> => {

    try {
        const response = await fetch(CancelBooking(number), {
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

export const rescheduleBooking = async (number: string, formData: RescheduleBookingFormdata) : Promise<Response<null>|null> => {

    try {
        const response = await fetch(RescheduleBooking(number), {
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

export const deleteBookingAdjustment = async (number: string, formData: DeleteBookingAdjustmentFormdata) : Promise<Response<null>|null> => {

    try {
        const response = await fetch(DeleteBookingAdjustment(number), {
            body: JSON.stringify(formData),
            method: 'delete',
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