"use client"

import { useMemo, useState } from "react"
import { Mic, Volume2, Copy, ThumbsUp, ThumbsDown, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import Logo from "../../public/logo"

const APOSTROPHES = ["'", "’", "ʻ", "ʼ", "`"]

const latinDigraphMap: Record<string, string> = {
  "o'": "ў",
  "g'": "ғ",
  sh: "ш",
  ch: "ч",
  ng: "нг",
  ya: "я",
  yo: "ё",
  yu: "ю",
  ye: "е",
  ts: "ц",
}

const latinSingleMap: Record<string, string> = {
  a: "а",
  b: "б",
  c: "с",
  d: "д",
  e: "е",
  f: "ф",
  g: "г",
  h: "ҳ",
  i: "и",
  j: "ж",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  q: "қ",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  v: "в",
  w: "в",
  x: "х",
  y: "й",
  z: "з",
}

const cyrillicSingleMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  ғ: "g'",
  д: "d",
  ж: "j",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  қ: "q",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "x",
  ҳ: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  ъ: "'",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  ё: "yo",
  ў: "o'",
  ң: "ng",
}

const isUpperCaseToken = (value: string) => value === value.toUpperCase() && value !== value.toLowerCase()
const isCapitalizedToken = (value: string) => value[0] === value[0].toUpperCase() && value[0] !== value[0].toLowerCase()

const applyCase = (sourceToken: string, targetToken: string) => {
  if (isUpperCaseToken(sourceToken)) {
    return targetToken.toUpperCase()
  }

  if (isCapitalizedToken(sourceToken)) {
    return targetToken.charAt(0).toUpperCase() + targetToken.slice(1)
  }

  return targetToken
}

const normalizeLatinApostrophe = (value: string) => {
  let normalized = value

  for (const apostrophe of APOSTROPHES) {
    normalized = normalized.replaceAll(`o${apostrophe}`, "o'")
    normalized = normalized.replaceAll(`O${apostrophe}`, "O'")
    normalized = normalized.replaceAll(`g${apostrophe}`, "g'")
    normalized = normalized.replaceAll(`G${apostrophe}`, "G'")
  }

  return normalized
}

const transliterateLatinToCyrillic = (input: string) => {
  const text = normalizeLatinApostrophe(input)
  let result = ""
  let i = 0

  while (i < text.length) {
    const twoChars = text.slice(i, i + 2)
    const digraph = latinDigraphMap[twoChars.toLowerCase()]

    if (digraph) {
      result += applyCase(twoChars, digraph)
      i += 2
      continue
    }

    const oneChar = text[i]
    const mappedSingle = latinSingleMap[oneChar.toLowerCase()]

    if (mappedSingle) {
      result += applyCase(oneChar, mappedSingle)
      i += 1
      continue
    }

    result += oneChar
    i += 1
  }

  return result
}

const transliterateCyrillicToLatin = (text: string) => {
  let result = ""

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const lowerChar = char.toLowerCase()

    if (lowerChar === "е") {
      const prev = i > 0 ? text[i - 1].toLowerCase() : ""
      const shouldUseYe = i === 0 || /[аеёиоуыэюяўйьъ]/.test(prev)
      const mappedYe = shouldUseYe ? "ye" : "e"
      result += applyCase(char, mappedYe)
      continue
    }

    const mapped = cyrillicSingleMap[lowerChar]

    if (mapped !== undefined) {
      result += applyCase(char, mapped)
      continue
    }

    result += char
  }

  return result
}

const transliterate = (text: string, isLatinToKirill: boolean) =>
  isLatinToKirill ? transliterateLatinToCyrillic(text) : transliterateCyrillicToLatin(text)
export default function Home() {
  const [leftText, setLeftText] = useState("")
  const [rightText, setRightText] = useState("")
  const [isLatinToKirill, setIsLatinToKirill] = useState(true)
  const webAppJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "LotinUp",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "uz",
      description:
        "LotinUp o'zbek matnlarini Lotin va Kirill alifbolari o'rtasida real vaqt rejimida transliteratsiya qiladi.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    }),
    [],
  )

  const handleLeftTextChange = (text: string) => {
    setLeftText(text)
    setRightText(transliterate(text, isLatinToKirill))
  }

  const handleRightTextChange = (text: string) => {
    setRightText(text)
    setLeftText(transliterate(text, !isLatinToKirill))
  }

  const handleSwapLanguages = () => {
    setIsLatinToKirill(!isLatinToKirill)
    setLeftText(rightText)
    setRightText(leftText)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#1a1d24] dark:text-gray-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#1a1d24]/90">
        <nav className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-grow px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-[#1e2227] dark:shadow-lg">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="h-full w-full flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-blue-700 dark:text-blue-400">{isLatinToKirill ? "Latin" : "Kirill"}</span>
                <span className="text-sm text-slate-500 dark:text-gray-500">{leftText.length}/5000</span>
              </div>
              <Textarea
                value={leftText}
                onChange={(e) => handleLeftTextChange(e.target.value)}
                placeholder={`${isLatinToKirill ? "Lotin" : "Кирилл"} matnini kiriting...`}
                className="h-[300px] resize-none rounded-md border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1a1d24] dark:text-gray-100 dark:placeholder-gray-500"
                maxLength={5000}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleSwapLanguages} className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full">
              <ArrowLeftRight className="h-6 w-6" />
            </Button>

            <div className="min-h-[300px] w-full flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-blue-700 dark:text-blue-400">{isLatinToKirill ? "Kirill" : "Latin"}</span>
                <span className="text-sm text-slate-500 dark:text-gray-500">{rightText.length}/5000</span>
              </div>
              <Textarea
                value={rightText}
                onChange={(e) => handleRightTextChange(e.target.value)}
                placeholder={`${isLatinToKirill ? "Кирилл" : "Lotin"} matnini kiriting...`}
                className="h-[300px] resize-none rounded-md border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1a1d24] dark:text-gray-100 dark:placeholder-gray-500"
                maxLength={5000}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 py-3 transition-colors duration-300 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4">

          <div className="mt-1 text-center text-sm text-slate-400 dark:text-gray-600">
            {new Date().getFullYear()}. Barcha huquqlar himoyalangan.
          </div>
          <div className="mt-1 text-center text-sm text-slate-400 dark:text-gray-600">
            <span className="font-medium text-blue-600 dark:text-blue-400">israilov.uz</span> tomonidan ishlab chiqilgan
          </div>
          <div className="mt-1 text-center text-sm text-slate-400 dark:text-gray-600">Beta v1.2.0</div>
        </div>
      </footer>
    </div>
  )
}

