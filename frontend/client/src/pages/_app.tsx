import { Layout } from '@/components/Layout'
import TaskContextProvider from '@/context/task'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <TaskContextProvider>
        <Component {...pageProps} />
      </TaskContextProvider>
    </Layout>
  )
}

export default MyApp