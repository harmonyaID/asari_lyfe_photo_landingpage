import { useSwr } from "@/hooks/swr"
import { GetLocationUrl } from "../urls"
import { Location } from "../types"

export const useGetLocation = () => {
    return useSwr<Location[]>(GetLocationUrl, { isActive: 1 })
}