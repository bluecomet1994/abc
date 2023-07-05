import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'
import '@/styles/globals.css'
import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'
import { AuthProvider } from '@/components/AuthContext'

const theme = createTheme({
  palette: {
    primary: teal
  }
});

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className={`flex h-screen flex-col items-center ${inter.className}`}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
