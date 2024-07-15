import { FC, PropsWithChildren } from "react";

export const MainPanel : FC<PropsWithChildren> = ({
    children
}) => {
    const year = new Date().getFullYear()

    return (
        <main className="main-panel">
            <div className="content">
                <div className="wrapper flex-grow-1">
                    { children }
                </div>
                <footer
                    className="border-top border-grey-800 d-flex justify-content-between align-items-center fs-7"
                >
                    <div 
                        className="text-grey-600"
                        title="copyright"
                    >
                        © {year} Lyfe Foto
                    </div>
                    <div
                        className="text-grey-400"
                        title="credit"
                    >
                        Design & Development By Harmonya Indonesia
                    </div>
                </footer>
            </div>
        </main>
    )
}