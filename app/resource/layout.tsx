import { ReactNode } from "react"
import { TabsContextContainer } from "./tabs"



export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return <TabsContextContainer>{children}</TabsContextContainer>
}