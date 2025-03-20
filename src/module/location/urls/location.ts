import { API } from "@/configs/urls";

export const GetLocationUrl = `${API}/branch-offices`
export const FindLocationUrl = (id : string | number) => `${API}/branch-offices/${id}`