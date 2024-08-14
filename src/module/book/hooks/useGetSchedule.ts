import { useSwr } from "@/hooks/swr"
import { Schedule } from "../types"
import { GetSchedule } from "../urls/schedule"

export const useGetSchedule = (locationId?: number | string, date?: string) => {
    return useSwr<Schedule[]>(!locationId || !date ? null : GetSchedule, { locationId, date })
}