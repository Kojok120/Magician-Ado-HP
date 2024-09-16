"use client";

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Profile = () => {
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
    <section id="profile" className="relative h-[75vh] py-10">
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          <Image
            src="/images/profile-sp.jpg"
            alt="Profile Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        ) : (
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/videos/profile-pc.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="absolute inset-0 md:right-auto md:left-0 md:w-1/2 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex md:block h-full">
        <div className="container mx-auto px-6 flex items-center md:items-start h-full">
          <div className="w-full md:w-1/2 md:mr-auto md:pr-12 text-center md:text-left md:pt-20">
            <h2 className="text-4xl md:text-5xl font-bold text-magic-white mb-4">
              {isJapanese ? 'プロフィール' : 'Profile'}
            </h2>
            <p className="text-white text-xl mb-4">
              {isJapanese ? 'Soma -Magician Ado' : 'Soma -Magician Ado'}
            </p>
            <p className="text-white text-lg md:text-xl">
              {isJapanese
                ? '18歳でマジックに出会い、芸術性に魅了され半年後19歳でプロデビュー。現在は単身でオーストラリアへ修行中。'
                : 'Magician Ado discovered the world of magic at the age of 18 and was captivated by its artistry. Just six months later, at 19, Ado made a professional debut. Currently, Ado is in Australia, training solo to further master the craft.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile