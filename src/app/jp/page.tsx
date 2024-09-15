import { Metadata } from 'next'
import Header from '../../components/Header'
import Profile from '../../components/Profile'
import Activities from '../../components/Activities'
import Tip from '../../components/Tip'
import Contact from '../../components/Contact'
import Links from '../../components/Links'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'マジシャン ADO - 公式ウェブサイト',
  description: 'プロフェッショナルマジシャン ADO の公式ウェブサイトへようこそ。驚きと不思議な時間をお届けします。',
}

export default function JapanesePage() {
return (
    <>
      <main className="min-h-screen bg-magic-blue">
        <Header />
        <Profile />
        <Activities />
        <Tip />
        <Contact />
        <Links />
      </main>
      <Footer />
    </>
  )
}