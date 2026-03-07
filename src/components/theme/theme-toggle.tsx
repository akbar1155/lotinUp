"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme/use-theme"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const isDarkActive = theme === "dark" || (theme === "system" && resolvedTheme === "dark")
  const nextTheme = isDarkActive ? "light" : "dark"
  const label = isDarkActive ? "Kunduzgi rejimga o'tkazish" : "Tungi rejimga o'tkazish"

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-300 dark:hover:bg-[#111827] dark:focus-visible:ring-offset-[#1a1d24]"
    >
      {isDarkActive ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
