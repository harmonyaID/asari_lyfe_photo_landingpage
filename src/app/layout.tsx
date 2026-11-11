import "@/scss/main.scss"
import "react-toastify/dist/ReactToastify.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { Metadata, Viewport } from "next"
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { Inter } from "@/configs/fonts";
import { getAppSettings } from "@/setting/services/app-setting";

export async function generateMetadata() : Promise<Metadata> {

    const appSettingResponse = await getAppSettings()

    const appName = appSettingResponse?.result?.name?.value || process.env.NEXT_PUBLIC_APP_NAME
    const favIcon = appSettingResponse?.result?.favicon?.value || '0'

    return {
        title: appName,
        description: `${appName}, A photography service`,
        icons: `${process.env.NEXT_PUBLIC_API_URL}/images/favicon.png?${favIcon}`,
    }
}

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    interactiveWidget: 'resizes-content'
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body 
                className={`${
                    Inter.className
                } ${
                    "overflow-x-hidden"
                }`}
            >
                <Script src="/js/bootstrap.js"/>
                { children }
                <ToastContainer/>
            </body>
        </html>
    )
}
