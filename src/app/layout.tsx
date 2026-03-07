import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-context"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lotinup.uz"
const siteName = "LotinUp"
const siteDescription =
  "LotinUp — o'zbek matnlarini Lotin va Kirill alifbolari o'rtasida tez, aniq va qulay transliteratsiya qiluvchi onlayn platforma."
const themeInitScript = `
(() => {
  try {
    const storageKey = "theme";
    const mediaQuery = "(prefers-color-scheme: dark)";
    const root = document.documentElement;
    const savedTheme = localStorage.getItem(storageKey);
    const theme = savedTheme === "light" || savedTheme === "dark" || savedTheme === "system" ? savedTheme : "system";
    const resolvedTheme = theme === "system"
      ? (window.matchMedia(mediaQuery).matches ? "dark" : "light")
      : theme;

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.setAttribute("data-theme", resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  } catch (_error) {}
})();
`
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "uz",
  description: siteDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | Lotin <-> Kirill transliteratsiya`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "LotinUp",
    "o'zbek transliteratsiya",
    "lotin kirill",
    "kirill lotin",
    "uzbek converter",
    "o'zbek alifbo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} | Lotin <-> Kirill transliteratsiya`,
    description: siteDescription,
    siteName,
    locale: "uz_UZ",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: `${siteName} logotipi`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Lotin <-> Kirill transliteratsiya`,
    description: siteDescription,
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
  creator: "israilov.uz",
  publisher: "israilov.uz",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

