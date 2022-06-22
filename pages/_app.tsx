import '../src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import Fonts from '../fonts'
import { chakraConfig } from '../chakra.config'

function App({ Component, pageProps }: AppProps) {
  return (
    <IconContext.Provider value={{ className: 'shared-class', size: '20px' }}>
      <ChakraProvider theme={chakraConfig}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </IconContext.Provider>
  )
}

export default App
