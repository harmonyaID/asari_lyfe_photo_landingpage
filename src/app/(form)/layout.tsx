import { BackdropPanel } from "@/components/panels/backdrop"
import { MainPanel } from "@/components/panels/main/components"
import { FC, PropsWithChildren } from "react"
import { FormLayoutProvider } from "./providers"

const Layout : FC<PropsWithChildren> = ({
    children
}) => {
    return (
        <>
            <BackdropPanel/>
            <MainPanel>
                { children }
            </MainPanel>
            <FormLayoutProvider/>
        </>
    )
}

export default Layout