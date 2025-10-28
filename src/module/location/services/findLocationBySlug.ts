import { Response } from "@/types/responses";
import { FindLocationUrl } from "../urls/location";
import { Location } from "../types";

export async function findLocationBySlug (slug: string) {
    try {
        const response = await fetch(FindLocationUrl(slug), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Timezone": window.timezone
            }
        })

        const result : Response<Location> = await response.json()

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