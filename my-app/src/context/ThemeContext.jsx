import { createContext, useCallback, useEffect, useState } from "react";


const ThemeContext = createContext()


const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme")

    if(savedTheme === "dark" || savedTheme === "light" || savedTheme === "system"){
        return savedTheme
    }

    return "system"
}


export const ThemeProvider = ( { children } ) => {

     const [ theme, setTheme ] = useState(getInitialTheme);

     const applyTheme = useCallback(() => {
        const root = document.documentElement;

        const resolvedTheme = theme === "system" ? getSystemTheme() : theme

        root.classList.toggle("dark", resolvedTheme === "dark")
     }, [theme])

     useEffect(() => {
        applyTheme()
        localStorage.setItem("theme", theme)
     },[theme, applyTheme])

     useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleChange = () => {
            if(theme === "system"){
                applyTheme()
            }
        }

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
     },[ theme , applyTheme])

     const themeToggle = () => {
        setTheme((currentTheme) => {
            if(currentTheme === "light") return "dark"
            if(currentTheme === "dark") return "system"
            return "light"
        })
     }

     const resolvedTheme = theme === "system" ? getSystemTheme() : theme


     return (
        <ThemeContext.Provider
        value={{
            theme, setTheme, themeToggle, resolvedTheme
        }}>
            { children }
        </ThemeContext.Provider>
     )
}

export { ThemeContext }