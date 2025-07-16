import { notifyError } from "@/helpers/notifications"
import { Response } from "@/types/responses"
import { SwrFetcherType } from "./types"

export const swrFetcher : SwrFetcherType = async (...params) => {
    try {
        let [url, requestInit] = params as [string, RequestInit]

        if (!requestInit) {
            requestInit = {}
        }

        if (!requestInit.headers) {
            requestInit.headers = {}
        }
        requestInit.headers = {
            ...requestInit.headers,
            accept: 'application/json',
        }
        
        const response = await fetch(url, requestInit)

        if (response.ok) {
            return response.json()
        }

        const code = response.status
        const data : Response = await response.json()

        let message = data.status.message

        if (data.status.internalMsg) {
            message += ` (${data.status.internalMsg})`
        }

        message += ` [${code}]`

        notifyError(message)

        return data

    } catch (error) {
        
        console.error(error)
        notifyError('Failed to get data from server')

    }
}