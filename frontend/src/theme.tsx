import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      body: {
        bg: '#0B1825',
        letterSpacing: '2%',

      }
    })
  },
  colors: {
    primary: {
      green: '#6DD7C4',
      blue1: '#0B1825',
      blue2: '#09121C',
      boxBorder: '#244153',
    },
    difficulty: {
      easy: '#76DD77',
      medium: '#FFA217',
      hard: '#F4372B',
    },
  },
  textStyles: {
    h1: {
      fontSize: ['17px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },


  }

})

export default theme