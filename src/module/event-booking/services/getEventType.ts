import { Response } from "@/types/responses";
import { FindEventTypeUrl, GetEventTypePackageUrl, GetEventTypeUrl } from "../urls/event-type";
import { EventType } from "../types/event-type";
import { Package } from "../types/package";

export async function getEventTypes () {
    try {
        const response = await fetch(GetEventTypeUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        })

        const result : Response<EventType[]> = await response.json()

        if (response.ok) {
            return {
                result  : result.result,
                status  : result.status,
            }
        }

        console.error(result)

        return null

    } catch (error) {
        console.error(error)
        return null
    }
}

export async function findEventType (slug: string) {
    try {
        const response = await fetch(FindEventTypeUrl(slug), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        })

        const result : Response<EventType> = await response.json()

        if (response.ok) {
            return {
                result  : result.result,
                status  : result.status,
            }
        }

        console.error(result)

        return null

    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getEventTypePackages (slug: string) {
    try {
        const response = await fetch(GetEventTypePackageUrl(slug), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        })

        const result : Response<Package[]> = await response.json()

        if (response.ok) {
            return {
                result  : result.result,
                status  : result.status,
            }
        }

        console.error(result)

        return null

    } catch (error) {
        console.error(error)
        return null
    }
}