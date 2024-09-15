"use client";

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaPiggyBank } from 'react-icons/fa'
import Image from 'next/image'

const Tip = () => {
  const pathname = usePathname()
  const [isJapanese, setIsJapanese] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsJapanese(pathname?.startsWith('/jp') ?? false)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the typical breakpoint for md in Tailwind
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [pathname])

  return (
    <section id="tip" className="relative py-20 my-10">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={isMobile ? "/images/tip-sp.jpg" : "/images/tip-pc.jpg"}
          alt="Tip Background"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-magic-white bg-opacity-70 p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-black text-center mb-8">
            {isJapanese ? 'チップ' : 'Tip'}
          </h2>
          <p className="text-black text-center text-xl mb-8">
            {isJapanese ? '応援ありがとうございます！' : 'Thank you for your support!'}
          </p>
          <div className="flex justify-center">
            <a
              href="https://busk.co/67279/tip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-magic-blue text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <FaPiggyBank className="mr-2 text-2xl" />
              <span className="text-lg font-semibold">
                {isJapanese ? 'チップを送る' : 'Send a Tip'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tip