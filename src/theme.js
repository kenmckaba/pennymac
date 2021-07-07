import { extendTheme } from '@chakra-ui/react'

// 37, 57, 94   25, 39, 5e
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
    brand: {
      main: '#25395e',
      shade: '#f2f3f8',
    },
  },
  components: {
    Button: {
      height: '100px',
      // colorScheme: 'yellow',
      // color: 'yellow',
      baseStyle: {
        backgroundColor: 'brand.main',
      },
      defaultProps: {
        colorScheme: 'brand.main',
        color: 'white',
        size: 'lg',
      },
    },
  },
}

const theme = extendTheme(config)

export default theme
