"use client";

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Activities = () => {
  const pathname = usePathname()
  const [isJapanese, setIsJapanese] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsJapanese(pathname?.startsWith('/jp') ?? false)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [pathname])

  return (
    <section id="activities" className="relative h-[75vh] my-10">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={isMobile ? "/images/activities-sp.jpg" : "/images/activities-pc.jpg"}
          alt="Activities Background"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 md:left-auto md:right-0 md:w-1/2 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex md:block h-full">
        <div className="container mx-auto px-6 flex items-center md:items-start h-full">
          <div className="w-full md:w-1/2 md:ml-auto md:pl-12 text-center md:text-left md:pt-20">
            <h2 className="text-4xl md:text-5xl font-bold text-magic-white mb-4">
              {isJapanese ? '活動場所' : 'Activities'}
            </h2>
            <p className="text-magic-white text-lg md:text-xl">
              {isJapanese
                ? 'オーストラリアでストリートパフォーマンスをしています'
                : 'Performing street magic in Australia'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activities