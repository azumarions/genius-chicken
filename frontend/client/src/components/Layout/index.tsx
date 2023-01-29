import { ReactElement } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Box } from '@mui/system'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => (
  <>
  <Box sx={{ bgcolor: "white"}}>
    <Header />
    <Box component="main">
      {children}
    </Box>
    <Footer />
    </Box>
  </>
)

export default Layout