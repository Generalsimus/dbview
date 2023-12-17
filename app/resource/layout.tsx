import { ReactNode, Suspense } from "react"
import { ResourceTabsProvider } from "./resources-tabs"
import Loading from "../loading"
import { SettingsView } from "../widgets/settings-view"



export default function Layout({ children }: {
    children: ReactNode
}) {
    return <>
        <ResourceTabsProvider>
            {children}
        </ResourceTabsProvider>
        <SettingsView />
    </>

}