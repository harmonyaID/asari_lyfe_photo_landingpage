import { useSwr } from "@/hooks/swr"
import { Timezone } from "../types"
import { GetTimezoneUrl } from "../urls/timezone"

export const useGetTimezone = (filter?: Record<string, any>) => {
    return useSwr<Timezone[]>(GetTimezoneUrl, filter)
}