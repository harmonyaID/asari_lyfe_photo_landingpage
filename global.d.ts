import bootstrap from "@types/bootstrap"

declare global {
    interface Window {
        timezone    : string
        bootstrap   : bootstrap
    }
}