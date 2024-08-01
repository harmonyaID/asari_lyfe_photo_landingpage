import { useSwr } from "@/hooks/swr"
import { GetPolicyUrl } from "../urls/policy"
import { Policy } from "../types"

export const useGetPolicy = () => {
    return useSwr<Policy>(GetPolicyUrl)
}