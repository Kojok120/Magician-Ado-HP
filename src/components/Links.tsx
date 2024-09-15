"use client";

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

const Links = () => {
  const pathname = usePathname()
  const [isJapanese, setIsJapanese] = useState(false)

  useEffect(() => {
    setIsJapanese(pathname?.startsWith('/jp') ?? false)
  }, [pathname])

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/magician_ado_v/',
      icon: FaInstagram,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@ikeokamoto',
      icon: FaYoutube,
    },
  ]

  return (
    <section id="links" className="py-0 my-5">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-magic-white text-center mb-8">
          {isJapanese ? 'リンク' : 'Links'}
        </h2>
        <div className="flex justify-center space-x-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-magic-white hover:text-gray-300 transition duration-300"
            >
              <link.icon className="w-12 h-12" />
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Links