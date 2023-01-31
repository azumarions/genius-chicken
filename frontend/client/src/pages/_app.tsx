import Layout from '@/components/Layout'
import CategoryContextProvider from '@/context/category'
import TaskContextProvider from '@/context/task'
import ColorContextProvider from '@/context/theme'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <TaskContextProvider>
        <CategoryContextProvider>
          <ColorContextProvider>
          <Component {...pageProps} />
          </ColorContextProvider>
        </CategoryContextProvider>
      </TaskContextProvider>
    </Layout>
  )
}

export default MyApp