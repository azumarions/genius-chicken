import Layout from '@/components/Layout'
import { ColorModeContext, ColorModeContextProvider } from '@/context/layout'
import TaskContextProvider from '@/context/task'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <TaskContextProvider>
        <ColorModeContextProvider>
          <Component {...pageProps} />
        </ColorModeContextProvider>
      </TaskContextProvider>
    </Layout>
  )
}

export default MyApp