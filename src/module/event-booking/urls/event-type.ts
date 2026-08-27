import { API } from "@/configs/urls";

export const GetEventTypeUrl = `${API}/event/event-types`
export const FindEventTypeUrl = (slug: string) => `${GetEventTypeUrl}/${slug}`
