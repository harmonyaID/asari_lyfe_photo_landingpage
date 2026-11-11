import { API } from "@/configs/urls";

export const GetEventTypeUrl = `${API}/event/event-types`
export const FindEventTypeUrl = (slug: string) => `${GetEventTypeUrl}/${slug}`
export const GetEventTypePackageUrl = (slug: string) => `${GetEventTypeUrl}/${slug}/packages`
export const FindEventTypePackageUrl = (slug: string, packageSlug: string) => `${GetEventTypeUrl}/${slug}/packages/${packageSlug}`
