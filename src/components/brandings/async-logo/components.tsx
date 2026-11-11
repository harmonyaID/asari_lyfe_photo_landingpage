import { FC } from "react";
import { getAppSettings } from "@/setting/services/app-setting";
import { LogoProps } from "../logo";

export const AsyncLogo : FC<LogoProps> = async ({
    size = 96,
    className = ''
}) => {

    const appSettingResponse = await getAppSettings()

    return (
        <img 
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/logo.webp?${appSettingResponse?.result?.logo?.value || 0}`}
            width={size}
            height="auto"
            alt={`${appSettingResponse?.result?.name?.value || 'Lyfe Foto'} Logo`}
            className={className}
            loading="lazy"
        />
    )
}