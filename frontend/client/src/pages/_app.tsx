import Layout from '@/components/Layout'
import CategoryContextProvider from '@/context/category'
import TaskContextProvider from '@/context/task'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <TaskContextProvider>
        <CategoryContextProvider>
          <Component {...pageProps} />
        </CategoryContextProvider>
      </TaskContextProvider>
    </Layout>
  )
}

export default MyApp