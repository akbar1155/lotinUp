"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

export type Theme = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const THEME_STORAGE_KEY = "theme"
const MEDIA_QUERY = "(prefers-color-scheme: dark)"

const ThemeContext = createContext<ThemeContextValue | null>(null)

const isThemeValue = (value: string | null): value is Theme => value === "light" || value === "dark" || value === "system"

const resolveSystemTheme = (): ResolvedTheme =>
  window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light"

const applyResolvedTheme = (resolvedTheme: ResolvedTheme) => {
  const root = document.documentElement
  root.classList.toggle("dark", resolvedTheme === "dark")
  root.setAttribute("data-theme", resolvedTheme)
  root.style.colorScheme = resolvedTheme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    const savedTheme: Theme = isThemeValue(storedTheme) ? storedTheme : "system"

    const initialResolvedTheme = savedTheme === "system" ? resolveSystemTheme() : savedTheme

    setThemeState(savedTheme)
    setResolvedTheme(initialResolvedTheme)
    applyResolvedTheme(initialResolvedTheme)
  }, [])

  useEffect(() => {
    const mediaQueryList = window.matchMedia(MEDIA_QUERY)

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (theme !== "system") {
        return
      }

      const nextResolvedTheme: ResolvedTheme = event.matches ? "dark" : "light"
      setResolvedTheme(nextResolvedTheme)
      applyResolvedTheme(nextResolvedTheme)
    }

    mediaQueryList.addEventListener("change", handleSystemThemeChange)

    return () => mediaQueryList.removeEventListener("change", handleSystemThemeChange)
  }, [theme])

  const setTheme = useCallback((nextTheme: Theme) => {
    const nextResolvedTheme = nextTheme === "system" ? resolveSystemTheme() : nextTheme

    document.documentElement.classList.add("theme-transition")

    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition")
    }, 260)

    setThemeState(nextTheme)
    setResolvedTheme(nextResolvedTheme)
    applyResolvedTheme(nextResolvedTheme)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }, [])

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}
