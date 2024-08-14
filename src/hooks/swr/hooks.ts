'use client';

import { Response } from "@/types/responses"
import useSWR from "swr"
import { swrFetcher } from "./functions"
import { useMemo } from "react"
import { objectToParam } from "@/helpers/requests";

export const useSwr = <Data = any> (
    url     : string | null,
    filter  : Record<string, any> = {}
) => {
    const target = useMemo(() => {
        if (!url) {
            return null
        }

        const param = objectToParam(filter)
        return `${url}${param}`
    }, [url, filter])

    return useSWR<Response<Data>>(target, swrFetcher, {
        shouldRetryOnError: false
    })
}