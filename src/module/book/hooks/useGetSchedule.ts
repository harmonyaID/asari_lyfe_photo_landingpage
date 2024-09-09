import { useSwr } from "@/hooks/swr"
import { Schedule } from "../types"
import { GetSchedule } from "../urls"
import { useMemo } from "react"

export const useGetSchedule = (locationId?: number | string, date?: string) => {
    const filter = useMemo(() => ({
        locationId,
        date,
        notExpired  : true,
        isActive    : true,
    }), [locationId, date])
    
    return useSwr<Schedule[]>(!locationId || !date ? null : GetSchedule, filter)
}