import Header from '../components/Header'
import Profile from '../components/Profile'
import Activities from '../components/Activities'
import Tip from '../components/Tip'
import Contact from '../components/Contact'
import Links from '../components/Links'
import Footer from '../components/Footer'

export default function Home() {
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