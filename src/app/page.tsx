"use client"

import { useState } from "react"
import { Mic, Volume2, Copy, ThumbsUp, ThumbsDown, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Logo from "../../public/logo"

const transliterate = (text: string, isLatinToKirill: boolean) => {
  const latinToCyrillic: Record<string, string> = {
    "A": "А",
    "B": "Б",
    "C": "С", "D": "Д", "E": "Е", "F": "Ф", "G": "Г", "H": "Ҳ", "I": "И", "J": "Ж", "K": "К", "L": "Л", "M": "М", "N": "Н", "O": "О", "P": "П", "Q": "Қ", "R": "Р", "S": "С", "T": "Т", "U": "У", "V": "В", "X": "Х", "Y": "Й", "Z": "З",
    "a": "а", "b": "б", "c": "с", "d": "д", "e": "е", "f": "ф", "g": "г", "h": "ҳ", "i": "и", "j": "ж", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", "q": "қ", "r": "р", "s": "с", "t": "т", "u": "у", "v": "в", "x": "х", "y": "й", "z": "з"
  }

  const cyrillicToLatin: Record<string, string> = Object.fromEntries(Object.entries(latinToCyrillic).map(([key, value]) => [value, key]))

  return text.split('').map(char => isLatinToKirill ? (latinToCyrillic[char] || char) : (cyrillicToLatin[char] || char)).join('')
}
export default function Home() {
  const [leftText, setLeftText] = useState("")
  const [rightText, setRightText] = useState("")
  const [isLatinToKirill, setIsLatinToKirill] = useState(true)

  const handleLeftTextChange = (text: string) => {
    setLeftText(text)
    setRightText(text)
    setRightText(transliterate(text, isLatinToKirill))
  }

  const handleRightTextChange = (text: string) => {
    setRightText(text)
    setLeftText(text)
    setLeftText(transliterate(text, !isLatinToKirill))
  }

  const handleSwapLanguages = () => {
    setIsLatinToKirill(!isLatinToKirill)
    setLeftText(rightText)
    setRightText(leftText)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1d24] text-gray-100">
      <header className="border-b border-gray-800 sticky top-0 bg-[#1a1d24] z-10">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex items-center">
              <Logo />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="bg-[#1e2227] rounded-lg p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full h-full">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-blue-400">{isLatinToKirill ? "Latin" : "Kirill"}</span>
                <span className="text-gray-500 text-sm">{leftText.length}/5000</span>
              </div>
              <Textarea
                value={leftText}
                onChange={(e) => handleLeftTextChange(e.target.value)}
                placeholder={`${isLatinToKirill ? "Lotin" : "Кирилл"} matnini kiriting...`}
                className="h-[300px] bg-[#1a1d24] border-gray-700 text-gray-100 placeholder-gray-500 resize-none focus:ring-1 focus:ring-blue-500 rounded-md"
                maxLength={5000}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Button className="text-gray-400 hover:text-white">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button className="text-gray-400 hover:text-white">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="text-gray-400 hover:text-white">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button className="text-gray-400 hover:text-white">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleSwapLanguages} className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full">
              <ArrowLeftRight className="h-6 w-6" />
            </Button>

            <div className="flex-1 w-full min-h-[300px]">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-blue-400">{isLatinToKirill ? "Kirill" : "Latin"}</span>
                <span className="text-gray-500 text-sm">{rightText.length}/5000</span>
              </div>
              <Textarea
                value={rightText}
                onChange={(e) => handleRightTextChange(e.target.value)}
                placeholder={`${isLatinToKirill ? "Кирилл" : "Lotin"} matnini kiriting...`}
                className=" h-[300px] bg-[#1a1d24] border-gray-700 text-gray-100 placeholder-gray-500 resize-none focus:ring-1 focus:ring-blue-500 rounded-md"
                maxLength={5000}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Button className="text-gray-400 hover:text-white">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button className="text-gray-400 hover:text-white">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="text-gray-400 hover:text-white">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button className="text-gray-400 hover:text-white">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="text-gray-400">LotinUp</span>
              <span className="text-gray-600">Beta v2.0</span>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-white">
                Xavfsizlik siyosat
              </a>
              <a href="#" className="hover:text-white">
                Foydalanuvchi siyosati
              </a>
              <a href="#" className="hover:text-white">
                Qoidalar
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-600 text-sm">2025. Barcha huquqlar himoyalangan.</div>
        </div>
      </footer>
    </div>
  )
}

