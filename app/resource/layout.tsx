import { ReactNode } from "react" 
import { ResourceTabsProvider } from "./resources-tabs"



export default function Layout({ children }: {
    children: ReactNode
}) {
    return <ResourceTabsProvider>{children}</ResourceTabsProvider>

}