import Layout from '@/components/Layout'
import AuthContextProvider from '@/context/auth'
import CategoryContextProvider from '@/context/category'
import TaskContextProvider from '@/context/task'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <CategoryContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CategoryContextProvider>
      </TaskContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp