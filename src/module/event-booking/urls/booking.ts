import { API } from "@/configs/urls";

const Booking = `${API}/event/bookings`

export const CreateBooking = Booking
export const CreateBookingFeedback = (number: string) => `${Booking}/${number}/feedback`