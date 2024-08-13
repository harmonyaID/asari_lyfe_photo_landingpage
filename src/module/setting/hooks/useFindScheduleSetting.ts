import { useSwr } from "@/hooks/swr"
import { ScheduleSetting } from "../types"
import { FindScheduleSetting } from "../urls"

export const useFindScheduleSetting = (code?: string, locationId?: number) => {
    return useSwr<ScheduleSetting>(code && locationId ? FindScheduleSetting(code, locationId) : null)
}