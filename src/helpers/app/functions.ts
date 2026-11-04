'use server'

import { getAppSettings } from "@/setting/services/app-setting"

export const getAppName = async () => {
    
    const appSettingResponse = await getAppSettings()
    return appSettingResponse?.result?.name?.value || process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto'

}