


import { useTheme } from '@//hooks/useTheme'
import { Monitor, Moon, Sun } from 'lucide-react'



const ThemeToggle = () => {

    const { theme, resolvedTheme, themeToggle } = useTheme()

    const isDark = resolvedTheme === "dark"

    const label = theme === "system" ? "using system theme" : isDark ?
     "using dark theme": "using light theme" 

  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted hover:text-foreground hover:bg-card transition-colors shrink-0"
      onClick={themeToggle}
      type="button"
      aria-label={label}
    >
        {theme === "system" ? (
            <Monitor size={16} />
        ): isDark ?  (
            <Moon size={16} />
        ) : (
            <Sun size={16} />
        )}
    </button>
  )
}

export default ThemeToggle