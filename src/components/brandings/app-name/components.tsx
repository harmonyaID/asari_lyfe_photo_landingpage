import { getAppName } from "@/helpers/app/functions";
import { getAppSettings } from "@/setting/services/app-setting";
import { FC } from "react";

export const AppName : FC = async () => {
    
    const appName = await getAppName()

    return (
        <>{ appName }</>
    )

}