import { Response } from "@/types/responses"
import { FindPublicLinkUrl } from "../urls/public-links"
import { PublicLink } from "../types/public-links"

export async function findPublicLinkByCode (code: string, referenceId: string) {
    try {

        const target = new URL(`${FindPublicLinkUrl(code)}`)
        target.searchParams.append('referenceId', referenceId || '')
        
        const response = await fetch(target.toString(), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            cache: 'no-store'
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