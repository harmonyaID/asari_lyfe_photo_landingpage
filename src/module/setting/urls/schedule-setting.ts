import { API } from "@/configs/urls"

const Setting = `${API}/settings`

const ScheduleSetting = `${Setting}/schedules`
export const GetScheduleSetting = `${ScheduleSetting}`
export const FindScheduleSetting = (code: string, locationId: number | string) => `${ScheduleSetting}/${code}/${locationId}`