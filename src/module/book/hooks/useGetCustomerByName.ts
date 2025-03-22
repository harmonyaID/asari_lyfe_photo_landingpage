import { useSwr } from "@/hooks/swr"
import { BriefCustomer } from "../types/customer"
import { GetCustomerByName } from "../urls/customer"

export const useGetCustomerByName = (filter : {search: string, limit: number}) => {
    return useSwr<BriefCustomer[]>(filter.search ? GetCustomerByName : null, filter)
}