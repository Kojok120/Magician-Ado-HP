"use client";

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FaFlag, FaFlagUsa, FaBars } from 'react-icons/fa'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isJapanese, setIsJapanese] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  useEffect(() => {
    setIsJapanese(pathname?.startsWith('/jp') ?? false)
  }, [pathname])

  const menuItems = [
    { name: isJapanese ? 'プロフィール' : 'Profile', href: '#profile' },
    { name: isJapanese ? '活動' : 'Activities', href: '#activities' },
    { name: isJapanese ? 'チップ' : 'Tip', href: '#tip' },
    { name: isJapanese ? 'お問い合わせ' : 'Contact', href: '#contact' },
    { name: isJapanese ? 'リンク' : 'Links', href: '#links' },
  ]

  const toggleLanguage = (lang: 'en' | 'jp') => {
    if (lang === 'en' && isJapanese) {
      router.push('/')
    } else if (lang === 'jp' && !isJapanese) {
      router.push('/jp')
    }
    setIsLangMenuOpen(false)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed w-full bg-black bg-opacity-100 text-magic-white z-50">
      <nav className="container mx-auto px-6 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-bold">Magician ADO</div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <FaBars size={24} />
            </button>
          </div>
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} className="text-lg hover:text-gray-300">
                {item.name}
              </a>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-lg hover:text-gray-300"
              >
                Language
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-magic-white rounded-md shadow-lg py-1 z-50">
                  <button onClick={() => toggleLanguage('en')} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                    <FaFlagUsa className="inline-block mr-2" /> English
                  </button>
                  <button onClick={() => toggleLanguage('jp')} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                    <FaFlag className="inline-block mr-2" /> 日本語
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </a>
            ))}
            <div className="relative py-2">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="block w-full text-left py-2 hover:text-gray-300"
              >
                Language
              </button>
              {isLangMenuOpen && (
                <div className="pl-4 mt-2">
                  <button onClick={() => toggleLanguage('en')} className="block w-full py-2 hover:text-gray-300 text-left">
                    <FaFlagUsa className="inline-block mr-2" /> English
                  </button>
                  <button onClick={() => toggleLanguage('jp')} className="block w-full py-2 hover:text-gray-300 text-left">
                    <FaFlag className="inline-block mr-2" /> 日本語
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header