"use client";

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Contact = () => {
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

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message, language: isJapanese ? 'jp' : 'en' }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitResult('success')
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      } else {
        throw new Error('メール送信に失敗しました')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitResult('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={isMobile ? "/images/contact-sp.jpg" : "/images/contact-pc.jpg"}
          alt="Contact Background"
          fill sizes="100vw"
          objectFit="cover"
          priority
        />
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-black bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-magic-white text-center mb-8">
            {isJapanese ? 'お問い合わせ' : 'Contact'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-magic-white mb-2">
                {isJapanese ? '名前*' : 'Name*'}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-magic-white mb-2">
                {isJapanese ? 'メールアドレス*' : 'Email*'}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-magic-white mb-2">
                {isJapanese ? '電話番号' : 'Phone'}
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-magic-white mb-2">
                {isJapanese ? 'メッセージ*' : 'Message*'}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-magic-blue text-magic-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isSubmitting
                ? (isJapanese ? '送信中...' : 'Sending...')
                : (isJapanese ? '送信する' : 'Send')}
            </button>
          </form>
          {submitResult === 'success' && (
            <p className="mt-4 text-green-500">
              {isJapanese
                ? 'メッセージが送信されました。'
                : 'Your message has been sent.'}
            </p>
          )}
          {submitResult === 'error' && (
            <p className="mt-4 text-red-500">
              {isJapanese
                ? 'エラーが発生しました。後でもう一度お試しください。'
                : 'An error occurred. Please try again later.'}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact