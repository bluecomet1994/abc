import { Inter } from 'next/font/google'
import Head from 'next/head'
import Navbar from '@/layouts/Navbar'
import Home from '@/layouts/Home'
import Footer from '@/layouts/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function App() {
  return (
    <>
      <Head>
        <title>ABC</title> 
      </Head>

      <main className={`flex h-screen flex-col items-center ${inter.className}`}>
        <Navbar />
        <Home />
        <Footer />
      </main>
    </>
  )
}
