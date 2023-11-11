"use server"
import { useRouter } from "next/router"




export default async function Page() {
    const router = useRouter()

    console.log({ router })
    return <h1>sss</h1>
}
