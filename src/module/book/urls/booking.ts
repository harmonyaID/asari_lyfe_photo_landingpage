import { API } from "@/configs/urls";

const Booking = `${API}/bookings`

export const CreateBooking = Booking
export const CancelBooking = (number: string) => `${Booking}/${number}/cancel`
export const RescheduleBooking = (number: string) => `${Booking}/${number}/reschedule`
export const DeleteBookingAdjustment = (number: string) => `${Booking}/${number}/adjustment`