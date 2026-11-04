import { DynamicServerError } from "next/dist/client/components/hooks-server-context";
import { GetAppSettingUrl } from "../urls";
import { Response } from "@/types/responses";
import { AppSetting } from "../types/app-setting";
import { AppSettingTag } from "../constants";

export async function getAppSettings() {
    try {

        const response = await fetch(GetAppSettingUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 3600,
                tags: [ AppSettingTag ]
            }
        })

        const result : Response<AppSetting> = await response.json()

        if (response.ok) {
            return {
                result  : result.result,
                status  : result.status,
            }
        }

        console.error(result)

        return null
        
    } catch (error) {
        if (error instanceof DynamicServerError) {
            throw error
        }

        console.error(error)
        return null
    }
}