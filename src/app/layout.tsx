import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/scss/main.scss"
import { BackdropPanel } from "@/components/panels/backdrop";
import { MainPanel } from "@/components/panels/main/components";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lyfe Foto",
    description: "Lyfe Foto, A photography service",
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
                <BackdropPanel/>
                <MainPanel>
                    { children }
                </MainPanel>
                <Script src="/js/bootstrap.js"/>
            </body>
        </html>
    )
}
