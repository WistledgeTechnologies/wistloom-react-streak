import { ThemeContext } from "@//context/ThemeContext"
import { useContext } from "react"


export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(context === undefined){
        throw new Error("useTheme is supposed ti be within a Provider")
    }

    return context;
}