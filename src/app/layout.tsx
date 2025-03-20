import "@/scss/main.scss"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { BackdropPanel } from "@/components/panels/backdrop";
import { MainPanel } from "@/components/panels/main/components";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: `${process.env.NEXT_PUBLIC_APP_NAME}, A photography service`,
    icons: "/images/favicon.png"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body 
                className={`${
                    inter.className
                } ${
                    "d-flex"
                }`}
            >
                <Script src="/js/bootstrap.js"/>
                <BackdropPanel/>
                <MainPanel>
                    { children }
                </MainPanel>
                <ToastContainer/>
            </body>
        </html>
    )
}
