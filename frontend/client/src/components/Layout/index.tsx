import { ReactElement } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Box } from '@mui/system'
import { ColorModeContextProvider } from '@/context/layout'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => (
  <>
  <ColorModeContextProvider>
    <Header />
    <Box component="main">
      {children}
    </Box>
    <Footer />
    </ColorModeContextProvider>
  </>
)

export default Layout