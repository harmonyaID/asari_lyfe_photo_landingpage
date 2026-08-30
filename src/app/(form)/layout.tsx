import { BackdropPanel } from "@/components/panels/backdrop"
import { MainPanel } from "@/components/panels/main/components"
import { FC, PropsWithChildren } from "react"
import { FormLayoutProvider } from "./providers"
import { BackdropProvider } from "@/book/contexts/BackdropContext"

const Layout : FC<PropsWithChildren> = ({
    children
}) => {
    return (
        <BackdropProvider>
            <BackdropPanel/>
            <MainPanel>
                { children }
            </MainPanel>
            <FormLayoutProvider/>
        </BackdropProvider>
    )
}

export default Layout