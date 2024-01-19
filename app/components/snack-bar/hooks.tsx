import { useContext } from "react"
import { SnackbarContext } from "."

export const useSnackbarContent = () => {
    return useContext(SnackbarContext)
}