import { useSwr } from "@/hooks/swr"
import { GetLocationUrl } from "../urls"
import { Location } from "../types"

export const useGetLocation = (filter : Record<string, any> = { isActive: 1 }) => {
    return useSwr<Location[]>(GetLocationUrl, filter)
}