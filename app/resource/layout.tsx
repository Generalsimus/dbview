import { ReactNode } from "react"
import { TabsContextContainer } from "./tabs-content"



export default function Layout({ children }: {
    children: ReactNode
}) {
    return <TabsContextContainer>{children}</TabsContextContainer>

}