import { useSwr } from "@/hooks/swr"
import { Language } from "../types"
import { GetLanguageUrl } from "../urls"

export const useGetLanguage = (filter : Record<string, any>) => {
    return useSwr<Language[]>(GetLanguageUrl, filter)
}