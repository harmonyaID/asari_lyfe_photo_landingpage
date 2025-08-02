import "@/scss/main.scss"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata, Viewport } from "next"
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { Inter } from "@/configs/fonts";

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: `${process.env.NEXT_PUBLIC_APP_NAME}, A photography service`,
    icons: "/images/favicon.png",
};

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
