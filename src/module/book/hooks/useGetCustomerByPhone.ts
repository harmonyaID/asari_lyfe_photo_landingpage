import { useSwr } from "@/hooks/swr"
import { BriefCustomer } from "../types/customer"
import { GetCustomerByPhone } from "../urls/customer"

export const useGetCustomerByPhone = (filter : {search: string, limit: number}) => {
    return useSwr<BriefCustomer[]>(filter.search ? GetCustomerByPhone : null, filter)
}