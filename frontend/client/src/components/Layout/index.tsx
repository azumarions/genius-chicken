import { ReactElement } from 'react'
import Header from '../Header'
import Footer from '../Footer'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)