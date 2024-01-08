import { useContext } from "react"
import { PickOnTopContext } from "."

export const usePickOnTop = () => {
    return useContext(PickOnTopContext)
}