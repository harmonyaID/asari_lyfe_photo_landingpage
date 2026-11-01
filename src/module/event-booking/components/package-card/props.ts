import { Package } from "@/event-booking/types/package";

export interface Props {
    eventTypeSlug: string
    eventPackage: Package
    show?: boolean
}