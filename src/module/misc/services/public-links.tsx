import { Response } from "@/types/responses"
import { FindPublicLinkUrl } from "../urls/public-links"
import { PublicLink } from "../types/public-links"

export async function findPublicLinkByCode (code: string, url: string) {
    try {

        const target = new URL(`${FindPublicLinkUrl(code)}`)
        target.searchParams.append('url', url || '')
        
        const response = await fetch(target.toString(), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const result : Response<PublicLink> = await response.json()

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