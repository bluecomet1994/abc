import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { teal } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: teal
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
