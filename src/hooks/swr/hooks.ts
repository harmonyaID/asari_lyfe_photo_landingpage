import { Response } from "@/types/responses"
import useSWR from "swr"
import { swrFetcher } from "./functions"

export const useSwr = <Data = any> (
    url : string | null
) => {
    return useSWR<Response<Data>>(url, swrFetcher, {
        shouldRetryOnError: false
    })
}